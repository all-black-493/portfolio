"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Shield, Smartphone, Globe, Award, TrendingUp } from "lucide-react"

const performanceMetrics = [
  {
    title: "Lighthouse Score",
    score: 98,
    icon: Zap,
    color: "text-green-500",
    details: [
      { label: "Performance", value: 98 },
      { label: "Accessibility", value: 100 },
      { label: "Best Practices", value: 96 },
      { label: "SEO", value: 100 },
    ],
  },
  {
    title: "Core Web Vitals",
    score: 95,
    icon: TrendingUp,
    color: "text-blue-500",
    details: [
      { label: "LCP", value: "1.2s" },
      { label: "FID", value: "8ms" },
      { label: "CLS", value: "0.05" },
      { label: "FCP", value: "0.9s" },
    ],
  },
  {
    title: "Security Score",
    score: 100,
    icon: Shield,
    color: "text-purple-500",
    details: [
      { label: "HTTPS", value: "A+" },
      { label: "Headers", value: "A+" },
      { label: "Vulnerabilities", value: "0" },
      { label: "Certificate", value: "Valid" },
    ],
  },
  {
    title: "Mobile Performance",
    score: 94,
    icon: Smartphone,
    color: "text-orange-500",
    details: [
      { label: "Speed Index", value: "1.8s" },
      { label: "TTI", value: "2.1s" },
      { label: "Bundle Size", value: "45KB" },
      { label: "Images", value: "WebP" },
    ],
  },
]

const achievements = [
  {
    title: "PWA Ready",
    description: "Offline-first architecture with service workers",
    icon: Globe,
    badge: "Progressive",
  },
  {
    title: "A11y Compliant",
    description: "WCAG 2.1 AA accessibility standards",
    icon: Shield,
    badge: "Accessible",
  },
  {
    title: "Performance Budget",
    description: "Under 50KB initial bundle size",
    icon: Zap,
    badge: "Optimized",
  },
  {
    title: "SEO Optimized",
    description: "Perfect semantic markup and meta tags",
    icon: Award,
    badge: "Discoverable",
  },
]

export function PerformanceShowcase() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Performance Metrics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world performance data showcasing optimization techniques and best practices
          </p>
        </motion.div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center mb-2">
                    <div className={`p-3 rounded-full bg-muted ${metric.color}`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                      {metric.score}
                      {typeof metric.score === "number" && "/100"}
                    </div>
                    <Progress value={typeof metric.score === "number" ? metric.score : 95} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    {metric.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{detail.label}</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Technical Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {achievement.badge}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Optimization Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl text-center">Optimization Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    category: "Code Splitting",
                    techniques: [
                      "Dynamic imports",
                      "Route-based splitting",
                      "Component lazy loading",
                      "Vendor chunking",
                    ],
                  },
                  {
                    category: "Asset Optimization",
                    techniques: ["WebP images", "SVG optimization", "Font subsetting", "Critical CSS"],
                  },
                  {
                    category: "Runtime Performance",
                    techniques: ["Virtual scrolling", "Memoization", "Debouncing", "Web Workers"],
                  },
                  {
                    category: "Caching Strategy",
                    techniques: ["Service Workers", "CDN caching", "Browser caching", "API caching"],
                  },
                  {
                    category: "Bundle Optimization",
                    techniques: ["Tree shaking", "Dead code elimination", "Minification", "Compression"],
                  },
                  {
                    category: "Loading Strategy",
                    techniques: ["Preloading", "Prefetching", "Resource hints", "Progressive loading"],
                  },
                ].map((category, index) => (
                  <div key={category.category} className="space-y-3">
                    <h5 className="font-semibold text-primary">{category.category}</h5>
                    <ul className="space-y-1">
                      {category.techniques.map((technique) => (
                        <li key={technique} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {technique}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
