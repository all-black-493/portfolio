"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const techStack = {
  frontend: [
    { name: "React", level: 95, projects: ["E-commerce Platform", "Task Manager", "Portfolio"] },
    { name: "Next.js", level: 90, projects: ["Blog Platform", "Portfolio", "SaaS Dashboard"] },
    { name: "TypeScript", level: 88, projects: ["E-commerce Platform", "Task Manager", "API Gateway"] },
    { name: "Tailwind CSS", level: 92, projects: ["Portfolio", "Blog Platform", "Mobile App"] },
    { name: "Framer Motion", level: 85, projects: ["Portfolio", "Landing Pages"] },
  ],
  backend: [
    { name: "Node.js", level: 90, projects: ["API Gateway", "Microservices", "Real-time Chat"] },
    { name: "Python", level: 85, projects: ["ML Pipeline", "Data Analysis", "Automation"] },
    { name: "PostgreSQL", level: 88, projects: ["E-commerce Platform", "User Management"] },
    { name: "MongoDB", level: 82, projects: ["Blog Platform", "Content Management"] },
    { name: "Redis", level: 80, projects: ["Caching Layer", "Session Management"] },
  ],
  cloud: [
    { name: "AWS", level: 85, projects: ["Serverless API", "Infrastructure"] },
    { name: "Docker", level: 88, projects: ["Containerization", "CI/CD Pipeline"] },
    { name: "Kubernetes", level: 75, projects: ["Orchestration", "Scaling"] },
    { name: "Vercel", level: 90, projects: ["Portfolio", "Frontend Deployments"] },
    { name: "Supabase", level: 85, projects: ["Authentication", "Real-time Features"] },
  ],
}

export function TechStackVisualizer() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof techStack>("frontend")
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <section id="tech-stack" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of the technologies I work with and the projects where I&apos;ve applied them
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-background rounded-lg p-1 border">
            {Object.keys(techStack).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as keyof typeof techStack)}
                className={`px-6 py-3 rounded-md font-medium transition-all capitalize ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techStack[activeCategory].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{tech.name}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {tech.level}%
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>

                    {/* Associated Projects */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Used in:</p>
                      <div className="flex flex-wrap gap-2">
                        {tech.projects.map((project) => (
                          <Badge
                            key={project}
                            variant="outline"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                          >
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Hover Details */}
        <AnimatePresence>
          {hoveredTech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-6 shadow-xl max-w-md">
                <h4 className="text-lg font-semibold mb-2">{hoveredTech}</h4>
                <p className="text-muted-foreground text-sm">
                  Click on any project badge to see detailed case studies and implementation details.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
