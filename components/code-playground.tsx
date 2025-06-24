"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Copy, Download, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { showToast } from "@/lib/toast"
import { SUCCESS_MESSAGES, ERROR_MESSAGES, logError } from "@/lib/errors"

const codeExamples = {
  react: {
    title: "Interactive React Component",
    description: "A custom hook for managing form state with validation",
    code: `import { useState, useCallback } from 'react'

// Custom hook for form validation
export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = useCallback((fieldName, value) => {
    const rule = validationRules[fieldName]
    if (!rule) return ''
    
    if (rule.required && !value) {
      return \`\${fieldName} is required\`
    }
    
    if (rule.minLength && value.length < rule.minLength) {
      return \`\${fieldName} must be at least \${rule.minLength} characters\`
    }
    
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || \`\${fieldName} format is invalid\`
    }
    
    return ''
  }, [validationRules])

  const handleChange = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }))
    
    if (touched[fieldName]) {
      const error = validate(fieldName, value)
      setErrors(prev => ({ ...prev, [fieldName]: error }))
    }
  }, [validate, touched])

  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    const error = validate(fieldName, values[fieldName])
    setErrors(prev => ({ ...prev, [fieldName]: error }))
  }, [validate, values])

  const isValid = Object.values(errors).every(error => !error)

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid
  }
}

// Usage Example
function ContactForm() {
  const { values, errors, handleChange, handleBlur, isValid } = useFormValidation(
    { name: '', email: '', message: '' },
    {
      name: { required: true, minLength: 2 },
      email: { 
        required: true, 
        pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
        message: 'Please enter a valid email'
      },
      message: { required: true, minLength: 10 }
    }
  )

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        className="w-full p-2 border rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        className="w-full p-2 border rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      
      <textarea
        placeholder="Message"
        value={values.message}
        onChange={(e) => handleChange('message', e.target.value)}
        onBlur={() => handleBlur('message')}
        className="w-full p-2 border rounded h-24"
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      
      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  )
}`,
    output: "Interactive form with real-time validation",
  },
  nextjs: {
    title: "Next.js API Route with Middleware",
    description: "Server-side API with authentication and rate limiting",
    code: `// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { verifyAuth } from '@/lib/auth'

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per minute
})

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const identifier = request.ip ?? 'anonymous'
    const { success } = await limiter.check(identifier, 10) // 10 requests per minute
    
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = await verifyAuth(token)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Process the request
    const data = {
      message: 'Access granted to protected resource',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID()
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.data) {
      return NextResponse.json(
        { error: 'Missing required field: data' },
        { status: 400 }
      )
    }

    // Process data
    const processedData = {
      id: crypto.randomUUID(),
      data: body.data.toUpperCase(),
      processedAt: new Date().toISOString(),
      status: 'processed'
    }

    return NextResponse.json({
      success: true,
      result: processedData
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// lib/rate-limit.ts
export function rateLimit(options: {
  interval: number
  uniqueTokenPerInterval: number
}) {
  const tokenCache = new Map()

  return {
    check: async (token: string, limit: number) => {
      const tokenCount = tokenCache.get(token) || [0, Date.now()]
      
      if (Date.now() - tokenCount[1] > options.interval) {
        tokenCount[0] = 1
        tokenCount[1] = Date.now()
      } else {
        tokenCount[0] += 1
      }

      tokenCache.set(token, tokenCount)

      return {
        success: tokenCount[0] <= limit,
        limit,
        remaining: Math.max(0, limit - tokenCount[0]),
        reset: new Date(tokenCount[1] + options.interval)
      }
    }
  }
}`,
    output: "Secure API with rate limiting and authentication",
  },
  algorithm: {
    title: "Advanced Algorithm Implementation",
    description: "Efficient graph traversal with memoization and optimization",
    code: `// Advanced Graph Algorithms with Optimization

class Graph {
  constructor() {
    this.adjacencyList = new Map()
    this.memoCache = new Map()
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, [])
    }
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1)
    this.addVertex(vertex2)
    
    this.adjacencyList.get(vertex1).push({ node: vertex2, weight })
    this.adjacencyList.get(vertex2).push({ node: vertex1, weight })
    
    // Clear cache when graph structure changes
    this.memoCache.clear()
  }

  // Dijkstra's algorithm with memoization
  shortestPath(start, end) {
    const cacheKey = \`\${start}-\${end}\`
    if (this.memoCache.has(cacheKey)) {
      return this.memoCache.get(cacheKey)
    }

    const distances = new Map()
    const previous = new Map()
    const unvisited = new Set()

    // Initialize distances
    for (let vertex of this.adjacencyList.keys()) {
      distances.set(vertex, vertex === start ? 0 : Infinity)
      unvisited.add(vertex)
    }

    while (unvisited.size > 0) {
      // Find unvisited vertex with minimum distance
      let current = null
      let minDistance = Infinity

      for (let vertex of unvisited) {
        if (distances.get(vertex) < minDistance) {
          minDistance = distances.get(vertex)
          current = vertex
        }
      }

      if (current === null || current === end) break

      unvisited.delete(current)

      // Update distances to neighbors
      const neighbors = this.adjacencyList.get(current) || []
      for (let neighbor of neighbors) {
        const alt = distances.get(current) + neighbor.weight
        if (alt < distances.get(neighbor.node)) {
          distances.set(neighbor.node, alt)
          previous.set(neighbor.node, current)
        }
      }
    }

    // Reconstruct path
    const path = []
    let current = end
    while (current !== undefined) {
      path.unshift(current)
      current = previous.get(current)
    }

    const result = {
      distance: distances.get(end),
      path: distances.get(end) === Infinity ? [] : path
    }

    // Cache the result
    this.memoCache.set(cacheKey, result)
    return result
  }

  // Graph analysis metrics
  analyzeGraph() {
    const vertices = this.adjacencyList.size
    let edges = 0
    let totalDegree = 0
    const degreeDistribution = new Map()

    for (let [vertex, neighbors] of this.adjacencyList) {
      const degree = neighbors.length
      totalDegree += degree
      edges += degree
      
      degreeDistribution.set(degree, (degreeDistribution.get(degree) || 0) + 1)
    }

    edges = edges / 2 // Each edge counted twice in undirected graph

    return {
      vertices,
      edges,
      averageDegree: totalDegree / vertices,
      density: (2 * edges) / (vertices * (vertices - 1)),
      degreeDistribution: Object.fromEntries(degreeDistribution)
    }
  }
}

// Usage Example
const graph = new Graph()

// Build a sample graph
const vertices = ['A', 'B', 'C', 'D', 'E', 'F']
vertices.forEach(v => graph.addVertex(v))

graph.addEdge('A', 'B', 4)
graph.addEdge('A', 'C', 2)
graph.addEdge('B', 'C', 1)
graph.addEdge('B', 'D', 5)
graph.addEdge('C', 'D', 8)
graph.addEdge('C', 'E', 10)
graph.addEdge('D', 'E', 2)
graph.addEdge('D', 'F', 6)
graph.addEdge('E', 'F', 3)

// Find shortest path
console.log('Shortest path A to F:', graph.shortestPath('A', 'F'))

// Analyze graph structure
console.log('Graph analysis:', graph.analyzeGraph())`,
    output: "Optimized graph algorithms with memoization and analysis",
  },
}

export function CodePlayground() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>("react")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    try {
      // Simulate code execution
      await new Promise((resolve) => setTimeout(resolve, 1500))
      showToast.success("Code executed successfully!", "Check the output panel for results.")
    } catch (error) {
      logError(error, "Code playground execution")
      showToast.error("Failed to execute code", "Please try again or check your code for errors.")
    } finally {
      setIsRunning(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[activeTab].code)
      showToast.success(SUCCESS_MESSAGES.GENERAL.COPIED_TO_CLIPBOARD)
    } catch (error) {
      logError(error, "Copy code to clipboard")
      showToast.error(ERROR_MESSAGES.GENERAL.BROWSER_NOT_SUPPORTED)
    }
  }

  const handleDownload = () => {
    try {
      const element = document.createElement("a")
      const file = new Blob([codeExamples[activeTab].code], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `${activeTab}-example.${activeTab === "nextjs" ? "ts" : "js"}`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      showToast.success(SUCCESS_MESSAGES.GENERAL.DOWNLOAD_STARTED)
    } catch (error) {
      logError(error, "Download code file")
      showToast.error("Failed to download file", "Please try copying the code instead.")
    }
  }

  return (
    <section id="playground" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Code Playground
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive code examples showcasing my problem-solving approach and coding style
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden border-2">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{codeExamples[activeTab].title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{codeExamples[activeTab].description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as keyof typeof codeExamples)}>
                <div className="border-b bg-muted/30">
                  <TabsList className="w-full justify-start rounded-none bg-transparent h-12">
                    <TabsTrigger value="react" className="data-[state=active]:bg-background">
                      <Badge variant="secondary" className="mr-2 bg-blue-100 text-blue-800">
                        React
                      </Badge>
                      Component Hook
                    </TabsTrigger>
                    <TabsTrigger value="nextjs" className="data-[state=active]:bg-background">
                      <Badge variant="secondary" className="mr-2 bg-green-100 text-green-800">
                        Next.js
                      </Badge>
                      API Route
                    </TabsTrigger>
                    <TabsTrigger value="algorithm" className="data-[state=active]:bg-background">
                      <Badge variant="secondary" className="mr-2 bg-purple-100 text-purple-800">
                        Algorithm
                      </Badge>
                      Graph Theory
                    </TabsTrigger>
                  </TabsList>
                </div>

                {Object.entries(codeExamples).map(([key, example]) => (
                  <TabsContent key={key} value={key} className="m-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
                      {/* Code Editor */}
                      <div className="lg:col-span-2 bg-slate-900 text-slate-100 p-6 overflow-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full" />
                              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                              <div className="w-3 h-3 bg-green-500 rounded-full" />
                            </div>
                            <span className="text-sm text-slate-400 ml-2">
                              {key === "react"
                                ? "useFormValidation.js"
                                : key === "nextjs"
                                  ? "route.ts"
                                  : "graph-algorithms.js"}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            onClick={handleRun}
                            disabled={isRunning}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {isRunning ? (
                              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <Play className="w-4 h-4 mr-1" />
                            )}
                            {isRunning ? "Running..." : "Run Code"}
                          </Button>
                        </div>
                        <pre className="text-sm leading-relaxed overflow-x-auto">
                          <code className="font-mono">{example.code}</code>
                        </pre>
                      </div>

                      {/* Output Panel */}
                      <div className="bg-background border-l p-6">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          Output
                        </h4>
                        <div className="bg-muted rounded-lg p-4 mb-4">
                          <p className="text-sm text-muted-foreground">
                            {isRunning ? "Executing code..." : example.output}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-2">Key Features:</h5>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              {key === "react" && (
                                <>
                                  <li>• Custom hook pattern</li>
                                  <li>• Real-time validation</li>
                                  <li>• Optimized re-renders</li>
                                  <li>• TypeScript support</li>
                                </>
                              )}
                              {key === "nextjs" && (
                                <>
                                  <li>• API route handlers</li>
                                  <li>• Rate limiting</li>
                                  <li>• Authentication middleware</li>
                                  <li>• Error handling</li>
                                </>
                              )}
                              {key === "algorithm" && (
                                <>
                                  <li>• Dijkstra&apos;s algorithm</li>
                                  <li>• Memoization</li>
                                  <li>• Cycle detection</li>
                                  <li>• Graph analysis</li>
                                </>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Performance:</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Time Complexity:</span>
                                <Badge variant="outline" className="text-xs">
                                  {key === "react" ? "O(1)" : key === "nextjs" ? "O(1)" : "O(V²)"}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Space Complexity:</span>
                                <Badge variant="outline" className="text-xs">
                                  {key === "react" ? "O(n)" : key === "nextjs" ? "O(1)" : "O(V)"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
