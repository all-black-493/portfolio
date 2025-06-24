import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"
import { rabbitmq } from "@/lib/rabbitmq"
import { systemStatusSchema } from "@/lib/validations"
import { handleApiError } from "@/lib/errors"

export async function GET() {
  try {
    const startTime = Date.now()

    // Get system metrics
    const [redisStats, rabbitmqStats] = await Promise.all([
      redis.getStats(),
      rabbitmq.getQueueStats()
    ])

    // Calculate memory usage
    const memoryUsage = process.memoryUsage()
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024)
    const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024)
    const memoryPercentage = Math.round((memoryUsedMB / memoryTotalMB) * 100)

    // Narrow redisStats type safely
    let keys: number | null = null
    let memoryMB: number | null = null

    if ('keys' in redisStats && 'memory' in redisStats) {
      keys = redisStats.keys
      memoryMB = Math.round(redisStats.memory / 1024 / 1024)
    }

    const systemStatus = {
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      memory: {
        used: memoryUsedMB,
        total: memoryTotalMB,
        percentage: memoryPercentage,
      },
      redis: {
        connected: redisStats.connected,
        hits: redisStats.hits,
        misses: redisStats.misses,
        keys: keys,
        memory: memoryMB,
      },
      rabbitmq: rabbitmqStats,
    }

    // Validate response with Zod
    const validatedStatus = systemStatusSchema.parse(systemStatus)

    const responseTime = Date.now() - startTime

    return NextResponse.json({
      ...validatedStatus,
      responseTime,
      status: "healthy",
    })

  } catch (error) {
    const errorMessage = handleApiError(error, "System status check")

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "System status check failed",
      },
      { status: 500 },
    )
  }
}
