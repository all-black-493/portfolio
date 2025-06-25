"use server"

import { actionClient } from "@/lib/safe-actions"
import { analyticsEventSchema } from "@/lib/validations"
import { rabbitmq } from "@/lib/rabbitmq"
import { redis, cacheKeys } from "@/lib/redis"

export const trackEvent = actionClient.metadata({
  actionName: "trackEvent",
}).inputSchema(analyticsEventSchema).action(
  async ({ parsedInput }) => {
    const { event } = parsedInput

    try {
      await rabbitmq.publishAnalytics(parsedInput)

      const today = new Date().toISOString().split("T")[0]
      const analyticsKey = cacheKeys.analytics(today)

      const dailyStats = (await redis.get<Record<string, number>>(analyticsKey)) || {}
      dailyStats[event] = (dailyStats[event] || 0) + 1

      await redis.set(analyticsKey, dailyStats, 24 * 60 * 60)

      return { success: true }
    } catch (error) {
      console.error("Analytics tracking error:", error)
      return { success: false }
    }
  },
)