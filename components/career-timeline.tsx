"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, GraduationCap, Award, Briefcase, Code, Users } from "lucide-react"

const timelineData = [
  {
    year: "2024",
    type: "work",
    title: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description:
      "Leading development of cloud-native applications serving 1M+ users. Architected microservices infrastructure reducing response times by 40%.",
    technologies: ["React", "Node.js", "AWS", "Kubernetes", "PostgreSQL"],
    achievements: ["Led team of 6 developers", "Reduced infrastructure costs by 30%", "Implemented CI/CD pipeline"],
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    year: "2023",
    type: "certification",
    title: "AWS Solutions Architect",
    company: "Amazon Web Services",
    location: "Remote",
    description:
      "Achieved AWS Solutions Architect Professional certification, demonstrating expertise in designing distributed systems.",
    technologies: ["AWS", "Cloud Architecture", "DevOps"],
    achievements: ["Professional level certification", "Cloud architecture expertise", "Infrastructure as Code"],
    icon: Award,
    color: "bg-orange-500",
  },
  {
    year: "2022",
    type: "work",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    description:
      "Built MVP from scratch using modern web technologies. Scaled application from 0 to 100K users in 8 months.",
    technologies: ["Next.js", "Python", "MongoDB", "Docker"],
    achievements: ["Built MVP in 3 months", "Scaled to 100K users", "Implemented real-time features"],
    icon: Code,
    color: "bg-green-500",
  },
  {
    year: "2021",
    type: "work",
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    location: "Remote",
    description: "Specialized in creating high-performance, accessible web applications for enterprise clients.",
    technologies: ["React", "TypeScript", "GraphQL", "Tailwind CSS"],
    achievements: ["Delivered 15+ client projects", "Improved performance by 50%", "Mentored junior developers"],
    icon: Users,
    color: "bg-purple-500",
  },
  {
    year: "2020",
    type: "education",
    title: "B.S. Computer Science",
    company: "University of Technology",
    location: "Boston, MA",
    description:
      "Graduated Magna Cum Laude with focus on software engineering and algorithms. Active in coding competitions and open source.",
    technologies: ["Java", "Python", "Data Structures", "Algorithms"],
    achievements: ["Magna Cum Laude", "Dean's List 4 semesters", "ACM Programming Contest finalist"],
    icon: GraduationCap,
    color: "bg-indigo-500",
  },
]

export function CareerTimeline() {
  return (
    <section id="timeline" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Career Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth, achievements, and continuous learning
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border" />

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs font-medium">
                          {item.year}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            item.type === "work"
                              ? "bg-blue-100 text-blue-800"
                              : item.type === "education"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {item.type === "work"
                            ? "Experience"
                            : item.type === "education"
                              ? "Education"
                              : "Certification"}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{item.company}</span>
                        <span>•</span>
                        <span className="text-sm">{item.location}</span>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Professional Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">4+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-muted-foreground">Users Impacted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
