import { HeroSection } from "@/components/hero-section"
import { TechStackVisualizer } from "@/components/tech-stack-visualizer"
import { ProjectShowcase } from "@/components/project-showcase"
import { CodePlayground } from "@/components/code-playground"
import { PerformanceShowcase } from "@/components/performance-showcase"
import { CareerTimeline } from "@/components/career-timeline"
import { ContactSection } from "@/components/contact-section"
import { MicrointeractionLab } from "@/components/microinteraction-lab"

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <TechStackVisualizer />
      <ProjectShowcase />
      <CodePlayground />
      <MicrointeractionLab />
      <PerformanceShowcase />
      <CareerTimeline />
      <ContactSection />
    </div>
  )
}
