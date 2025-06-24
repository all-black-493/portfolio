import { NextResponse } from "next/server"
import { ERROR_MESSAGES, handleApiError } from "@/lib/errors"

// Mock GitHub data - in production, you'd fetch from GitHub API
const mockGitHubData = {
  user: {
    login: "alexchen",
    name: "Alex Chen",
    bio: "Full-stack developer passionate about clean code and great UX",
    public_repos: 42,
    followers: 1250,
    following: 180,
    created_at: "2018-01-15T00:00:00Z",
  },
  repos: [
    {
      id: 1,
      name: "react-performance-toolkit",
      description: "A collection of React performance optimization tools and utilities",
      stargazers_count: 1240,
      forks_count: 89,
      language: "TypeScript",
      updated_at: "2024-01-15T00:00:00Z",
      html_url: "https://github.com/alexchen/react-performance-toolkit",
    },
    {
      id: 2,
      name: "nextjs-auth-starter",
      description: "Production-ready Next.js authentication starter with multiple providers",
      stargazers_count: 890,
      forks_count: 156,
      language: "JavaScript",
      updated_at: "2024-01-10T00:00:00Z",
      html_url: "https://github.com/alexchen/nextjs-auth-starter",
    },
    {
      id: 3,
      name: "microservice-patterns",
      description: "Implementation examples of common microservice patterns in Node.js",
      stargazers_count: 567,
      forks_count: 78,
      language: "JavaScript",
      updated_at: "2024-01-08T00:00:00Z",
      html_url: "https://github.com/alexchen/microservice-patterns",
    },
  ],
  contributions: {
    total: 2847,
    weeks: Array.from({ length: 52 }, (_, i) => ({
      week: i,
      contributions: Math.floor(Math.random() * 20) + 5,
    })),
  },
}

export async function GET() {
  try {
    // In production, you would fetch from GitHub API:
    // const response = await fetch('https://api.github.com/users/yourusername', {
    //   headers: {
    //     'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    //     'Accept': 'application/vnd.github.v3+json'
    //   }
    // })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockGitHubData)
  } catch (error) {
    const errorMessage = handleApiError(error, "GitHub API fetch")

    return NextResponse.json({ error: ERROR_MESSAGES.GITHUB.FETCH_FAILED }, { status: 500 })
  }
}
