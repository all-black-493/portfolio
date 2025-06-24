"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Code, Zap, Users } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js and serverless functions, featuring real-time inventory management, Stripe payment integration, and a powerful admin dashboard. Implemented microservices architecture for scalability.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis"],
    github: "https://github.com",
    live: "https://demo.com",
    metrics: {
      performance: 95,
      users: "10K+",
      uptime: "99.9%",
    },
    challenges: [
      "Implementing real-time inventory updates across multiple warehouses",
      "Optimizing database queries for product search and filtering",
      "Building a scalable payment processing system",
    ],
    learnings: [
      "Advanced PostgreSQL optimization techniques",
      "Serverless architecture patterns",
      "Payment gateway security best practices",
    ],
  },
  {
    id: 2,
    title: "AI-Powered Task Manager",
    description: "Intelligent task management app with AI-driven prioritization and natural language processing.",
    longDescription:
      "An innovative task management application that uses machine learning to automatically prioritize tasks, suggest optimal scheduling, and provide intelligent insights into productivity patterns.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["React", "Python", "OpenAI API", "Next.js", "MongoDB"],
    github: "https://github.com",
    live: "https://demo.com",
    metrics: {
      performance: 92,
      users: "5K+",
      uptime: "99.8%",
    },
    challenges: [
      "Integrating AI models for task prioritization",
      "Implementing real-time collaboration features",
      "Optimizing AI inference for mobile devices",
    ],
    learnings: [
      "AI API integration strategies",
      "Real-time data synchronization patterns",
      "Mobile-first AI application design",
    ],
  },
  {
    id: 3,
    title: "Real-time Analytics Dashboard",
    description: "Interactive dashboard for monitoring business metrics with real-time data visualization.",
    longDescription:
      "A comprehensive analytics dashboard that processes millions of data points in real-time, providing interactive visualizations and automated insights for business decision-making.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["Next.js", "D3.js", "WebSocket", "PostgreSQL", "Docker"],
    github: "https://github.com",
    live: "https://demo.com",
    metrics: {
      performance: 98,
      users: "2K+",
      uptime: "99.95%",
    },
    challenges: [
      "Processing high-volume real-time data streams",
      "Creating responsive data visualizations",
      "Implementing efficient caching strategies",
    ],
    learnings: [
      "Advanced data visualization techniques",
      "Real-time data processing optimization",
      "Scalable WebSocket architecture",
    ],
  },
]

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [filter, setFilter] = useState<"all" | "frontend" | "fullstack" | "ai">("all")

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "frontend") return project.tech.some((t) => ["React", "Next.js", "D3.js"].includes(t))
    if (filter === "fullstack") return project.tech.some((t) => ["PostgreSQL", "MongoDB", "Docker"].includes(t))
    if (filter === "ai") return project.tech.some((t) => ["Python", "OpenAI API"].includes(t))
    return true
  })

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my recent work, featuring detailed case studies and technical deep-dives
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 flex-wrap">
            {[
              { key: "all", label: "All Projects" },
              { key: "frontend", label: "Frontend" },
              { key: "fullstack", label: "Full-Stack" },
              { key: "ai", label: "AI/ML" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                onClick={() => setFilter(key as any)}
                className="mb-2"
              >
                {label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {project.metrics.performance}% Performance
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.metrics.users} Users
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedProject(project)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                      <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                      ×
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <Image
                        src={selectedProject.image || "/placeholder.svg"}
                        alt={selectedProject.title}
                        width={600}
                        height={400}
                        className="w-full rounded-lg mb-6"
                      />

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tech.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Key Metrics</h4>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary">
                                {selectedProject.metrics.performance}%
                              </div>
                              <div className="text-xs text-muted-foreground">Performance</div>
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary">{selectedProject.metrics.users}</div>
                              <div className="text-xs text-muted-foreground">Users</div>
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary">{selectedProject.metrics.uptime}</div>
                              <div className="text-xs text-muted-foreground">Uptime</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Challenges</h4>
                        <ul className="space-y-2">
                          {selectedProject.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Key Learnings</h4>
                        <ul className="space-y-2">
                          {selectedProject.learnings.map((learning, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {learning}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button asChild className="flex-1">
                          <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </a>
                        </Button>
                        <Button variant="outline" asChild className="flex-1">
                          <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
