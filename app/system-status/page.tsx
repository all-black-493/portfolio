"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Server, Database, MessageSquare, Activity, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { SystemStatus } from "@/lib/validations"

export default function SystemStatusPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStatus = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/system-status")
      if (!response.ok) {
        throw new Error("Failed to fetch system status")
      }

      const data = await response.json()
      setStatus(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const getStatusColor = (connected: boolean) => {
    return connected ? "text-green-500" : "text-red-500"
  }

  const getStatusIcon = (connected: boolean) => {
    return connected ? CheckCircle : XCircle
  }

  if (loading && !status) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Loading system status...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error && !status) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Status</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchStatus}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">System Status</h1>
            <p className="text-muted-foreground">Real-time monitoring of application infrastructure and services</p>
          </div>

          <div className="flex items-center gap-4">
            {lastUpdated && (
              <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
            )}
            <Button onClick={fetchStatus} disabled={loading} variant="outline" size="sm">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh
            </Button>
          </div>
        </div>

        {status && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Application Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Application</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Healthy
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span>{formatUptime(status.uptime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memory:</span>
                    <span>
                      {status.memory.used}MB / {status.memory.total}MB
                    </span>
                  </div>
                </div>
                <Progress value={status.memory.percentage} className="mt-3" />
              </CardContent>
            </Card>

            {/* Redis Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Redis Cache</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {React.createElement(getStatusIcon(status.redis.connected), {
                    className: `w-5 h-5 ${getStatusColor(status.redis.connected)}`,
                  })}
                  <Badge
                    variant="secondary"
                    className={status.redis.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {status.redis.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cache Hits:</span>
                    <span>{status.redis.hits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cache Misses:</span>
                    <span>{status.redis.misses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Keys:</span>
                    <span>{status.redis.keys.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memory:</span>
                    <span>{status.redis.memory}MB</span>
                  </div>
                </div>
                {status.redis.hits + status.redis.misses > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Hit Rate</span>
                      <span>{Math.round((status.redis.hits / (status.redis.hits + status.redis.misses)) * 100)}%</span>
                    </div>
                    <Progress
                      value={(status.redis.hits / (status.redis.hits + status.redis.misses)) * 100}
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* RabbitMQ Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Message Queue</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {React.createElement(getStatusIcon(status.rabbitmq.connected), {
                    className: `w-5 h-5 ${getStatusColor(status.rabbitmq.connected)}`,
                  })}
                  <Badge
                    variant="secondary"
                    className={status.rabbitmq.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {status.rabbitmq.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {status.rabbitmq.queues.map((queue) => (
                    <div key={queue.name} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{queue.name.replace("_", " ")}:</span>
                      <span>{queue.messages} msgs</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Performance Metrics */}
        {status && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{status.responseTime || 0}ms</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{status.memory.percentage}%</div>
                  <div className="text-sm text-muted-foreground">Memory Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{status.redis.keys}</div>
                  <div className="text-sm text-muted-foreground">Cached Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {status.rabbitmq.queues.reduce((sum, q) => sum + q.messages, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Queued Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
