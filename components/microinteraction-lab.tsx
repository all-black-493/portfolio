"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ThumbsUp, Zap, Sparkles, Rocket } from "lucide-react"

const microinteractions = [
  {
    id: "like-button",
    title: "Animated Like Button",
    description: "Heart animation with particle effects",
    component: "LikeButton",
  },
  {
    id: "rating-stars",
    title: "Interactive Rating",
    description: "Smooth star rating with hover effects",
    component: "RatingStars",
  },
  {
    id: "loading-button",
    title: "Loading States",
    description: "Button with morphing loading animation",
    component: "LoadingButton",
  },
  {
    id: "hover-cards",
    title: "Hover Transformations",
    description: "Cards with 3D tilt and glow effects",
    component: "HoverCards",
  },
]

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      // Generate particles
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      }))
      setParticles(newParticles)

      // Clear particles after animation
      setTimeout(() => setParticles([]), 1000)
    }
  }

  return (
    <div className="relative flex items-center justify-center p-8">
      <motion.button
        onClick={handleLike}
        className="relative p-4 rounded-full bg-background border-2 border-border hover:border-red-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.3, 1] : 1,
            rotate: isLiked ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`w-8 h-8 transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-muted-foreground"}`}
          />
        </motion.div>

        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ left: "50%", top: "50%" }}
            />
          ))}
        </AnimatePresence>
      </motion.button>

      <motion.span className="ml-4 text-lg font-medium" animate={{ color: isLiked ? "#ef4444" : "#6b7280" }}>
        {isLiked ? "Liked!" : "Like"}
      </motion.span>
    </div>
  )
}

function RatingStars() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center justify-center p-8 space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          onClick={() => setRating(star)}
          onHoverStart={() => setHoverRating(star)}
          onHoverEnd={() => setHoverRating(0)}
          className="p-1"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              rotate: hoverRating >= star || rating >= star ? [0, -10, 10, 0] : 0,
              scale: hoverRating >= star || rating >= star ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                hoverRating >= star || rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
              }`}
            />
          </motion.div>
        </motion.button>
      ))}
      <span className="ml-4 text-lg font-medium">{rating > 0 ? `${rating}/5` : "Rate this"}</span>
    </div>
  )
}

function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        className="relative px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium overflow-hidden"
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
        animate={{
          width: isLoading ? 60 : "auto",
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Launch
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

function HoverCards() {
  const cards = [
    { icon: Zap, title: "Performance", color: "from-yellow-400 to-orange-500" },
    { icon: Sparkles, title: "Design", color: "from-purple-400 to-pink-500" },
    { icon: ThumbsUp, title: "Quality", color: "from-green-400 to-blue-500" },
  ]

  return (
    <div className="flex items-center justify-center p-8 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className="relative w-32 h-40 bg-background border rounded-xl cursor-pointer overflow-hidden"
          whileHover={{
            scale: 1.05,
            rotateY: 10,
            rotateX: 5,
            z: 50,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 bg-gradient-to-br"
            style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />

          <div className="flex flex-col items-center justify-center h-full p-4">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <card.icon className="w-12 h-12 text-primary mb-4" />
            </motion.div>
            <h3 className="text-sm font-medium text-center">{card.title}</h3>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0"
            style={{
              background: `linear-gradient(135deg, ${card.color.replace("from-", "").replace(" to-", ", ")})`,
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function MicrointeractionLab() {
  const [activeDemo, setActiveDemo] = useState(microinteractions[0].id)

  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case "LikeButton":
        return <LikeButton />
      case "RatingStars":
        return <RatingStars />
      case "LoadingButton":
        return <LoadingButton />
      case "HoverCards":
        return <HoverCards />
      default:
        return null
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Microinteraction Lab
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing advanced UI animations and interactions that bring interfaces to life
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Demo Selection */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {microinteractions.map((demo) => (
              <Button
                key={demo.id}
                variant={activeDemo === demo.id ? "default" : "outline"}
                onClick={() => setActiveDemo(demo.id)}
                className="mb-2"
              >
                {demo.title}
              </Button>
            ))}
          </div>

          {/* Demo Display */}
          <Card className="overflow-hidden border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{microinteractions.find((d) => d.id === activeDemo)?.title}</CardTitle>
              <p className="text-muted-foreground">{microinteractions.find((d) => d.id === activeDemo)?.description}</p>
            </CardHeader>
            <CardContent className="min-h-[300px] flex items-center justify-center bg-muted/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderComponent(microinteractions.find((d) => d.id === activeDemo)?.component || "")}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Badge variant="secondary" className="mb-2">
                  Framer Motion
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Advanced animations with spring physics and gesture handling
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Badge variant="secondary" className="mb-2">
                  CSS Transforms
                </Badge>
                <p className="text-sm text-muted-foreground">Hardware-accelerated 3D transformations and effects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Badge variant="secondary" className="mb-2">
                  State Management
                </Badge>
                <p className="text-sm text-muted-foreground">Optimized React state updates for smooth interactions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
