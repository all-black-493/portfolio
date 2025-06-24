import { NextResponse } from "next/server"
import { redis, cacheKeys } from "@/lib/redis"
import { githubUserSchema, githubRepoSchema } from "@/lib/validations"
import { ERROR_MESSAGES, handleApiError } from "@/lib/errors"

// Cache TTL for GitHub data (1 hour)
const GITHUB_CACHE_TTL = 3600

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
    const username = "alexchen" // In production, get from env or params
    const userCacheKey = cacheKeys.github(username)
    const reposCacheKey = cacheKeys.githubRepos(username)

    // Try to get data from cache first
    const cachedData = await redis.get<typeof mockGitHubData>(userCacheKey)

    if (cachedData) {
      console.log("🎯 Serving GitHub data from cache")
      return NextResponse.json(cachedData)
    }

    console.log("🌐 Fetching fresh GitHub data")

    // In production, you would fetch from GitHub API:
    // const [userResponse, reposResponse] = await Promise.all([
    //   fetch(`https://api.github.com/users/${username}`, {
    //     headers: {
    //       'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    //       'Accept': 'application/vnd.github.v3+json'
    //     }
    //   }),
    //   fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
    //     headers: {
    //       'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    //       'Accept': 'application/vnd.github.v3+json'
    //     }
    //   })
    // ])

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Validate data with Zod schemas
    const validatedUser = githubUserSchema.parse(mockGitHubData.user)
    const validatedRepos = mockGitHubData.repos.map((repo) => githubRepoSchema.parse(repo))

    const responseData = {
      user: validatedUser,
      repos: validatedRepos,
      contributions: mockGitHubData.contributions,
    }

    // Cache the validated data
    await redis.set(userCacheKey, responseData, GITHUB_CACHE_TTL)

    return NextResponse.json(responseData)
  } catch (error) {
    const errorMessage = handleApiError(error, "GitHub API fetch")
    return NextResponse.json({ error: ERROR_MESSAGES.GITHUB.FETCH_FAILED }, { status: 500 })
  }
}
