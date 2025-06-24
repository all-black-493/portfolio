import { Redis } from "ioredis"
import { logError } from "./errors"

class RedisClient {
  private client: Redis | null = null
  private isConnected = false
  private stats = {
    hits: 0,
    misses: 0,
    operations: 0,
  }

  constructor() {
    this.connect()
  }

  private async connect() {
    try {
      if (!process.env.REDIS_URL) {
        console.warn("Redis URL not configured, caching disabled")
        return
      }

      this.client = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      })

      this.client.on("connect", () => {
        console.log("✅ Redis connected successfully")
        this.isConnected = true
      })

      this.client.on("error", (error) => {
        console.error("❌ Redis connection error:", error)
        logError(error, "Redis connection")
        this.isConnected = false
      })

      this.client.on("close", () => {
        console.log("🔌 Redis connection closed")
        this.isConnected = false
      })

      await this.client.connect()
    } catch (error) {
      logError(error, "Redis initialization")
      this.isConnected = false
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client || !this.isConnected) {
      this.stats.misses++
      return null
    }

    try {
      this.stats.operations++
      const value = await this.client.get(key)

      if (value) {
        this.stats.hits++
        console.log(`🎯 Cache HIT for key: ${key}`)
        return JSON.parse(value)
      } else {
        this.stats.misses++
        console.log(`❌ Cache MISS for key: ${key}`)
        return null
      }
    } catch (error) {
      logError(error, `Redis GET operation for key: ${key}`)
      this.stats.misses++
      return null
    }
  }

  async set<T>(key: string, value: T, ttlSeconds = 3600): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false
    }

    try {
      this.stats.operations++
      const serialized = JSON.stringify(value)
      await this.client.setex(key, ttlSeconds, serialized)
      console.log(`💾 Cache SET for key: ${key} (TTL: ${ttlSeconds}s)`)
      return true
    } catch (error) {
      logError(error, `Redis SET operation for key: ${key}`)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false
    }

    try {
      this.stats.operations++
      const result = await this.client.del(key)
      console.log(`🗑️ Cache DELETE for key: ${key}`)
      return result > 0
    } catch (error) {
      logError(error, `Redis DELETE operation for key: ${key}`)
      return false
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false
    }

    try {
      const result = await this.client.exists(key)
      return result === 1
    } catch (error) {
      logError(error, `Redis EXISTS operation for key: ${key}`)
      return false
    }
  }

  async getStats() {
    const baseStats = { ...this.stats, connected: this.isConnected }

    if (!this.client || !this.isConnected) {
      return {
        ...baseStats,
        memory: 0,
        keys: 0,
        uptime: 0,
      }
    }

    try {
      const info = await this.client.info("memory")
      const dbsize = await this.client.dbsize()
      const uptime = await this.client.info("server")

      const memoryMatch = info.match(/used_memory:(\d+)/)
      const uptimeMatch = uptime.match(/uptime_in_seconds:(\d+)/)

      return {
        ...baseStats,
        memory: memoryMatch ? Number.parseInt(memoryMatch[1]) : 0,
        keys: dbsize,
        uptime: uptimeMatch ? Number.parseInt(uptimeMatch[1]) : 0,
      }
    } catch (error) {
      logError(error, "Redis stats retrieval")
      return baseStats
    }
  }

  async flush(): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false
    }

    try {
      await this.client.flushdb()
      console.log("🧹 Redis cache flushed")
      return true
    } catch (error) {
      logError(error, "Redis flush operation")
      return false
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit()
      this.isConnected = false
    }
  }
}

// Singleton instance
export const redis = new RedisClient()

// Cache key generators
export const cacheKeys = {
  github: (username: string) => `github:user:${username}`,
  githubRepos: (username: string) => `github:repos:${username}`,
  systemStatus: () => "system:status",
  contactFormRate: (ip: string) => `rate:contact:${ip}`,
  analytics: (date: string) => `analytics:${date}`,
} as const
