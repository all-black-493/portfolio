"use server"

import { actionClient } from "@/lib/safe-actions"
import { analyticsEventSchema } from "@/lib/validations"
import { rabbitmq } from "@/lib/rabbitmq"
import { redis, cacheKeys } from "@/lib/redis"

export const trackEvent = actionClient
  .inputSchema(analyticsEventSchema)
  .action(async ({ parsedInput }) => {
    try {
      // Queue analytics event for async processing
      await rabbitmq.publishAnalytics(parsedInput)

      // Also cache daily analytics summary
      const today = new Date().toISOString().split("T")[0]
      const analyticsKey = cacheKeys.analytics(today)

      const dailyStats = (await redis.get<Record<string, number>>(analyticsKey)) || {}
      dailyStats[parsedInput.event] = (dailyStats[parsedInput.event] || 0) + 1

      await redis.set(analyticsKey, dailyStats, 24 * 60 * 60) // 24 hours TTL

      return { success: true }
    } catch (error) {
      console.error("Analytics tracking error:", error)
      // Don't throw error for analytics - it's not critical
      return { success: false }
    }
  })
