import { z } from "zod"

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

// GitHub API validation schema
export const githubUserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
})

export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  html_url: z.string().url(),
})

// System monitoring schemas
export const systemStatusSchema = z.object({
  timestamp: z.string(),
  uptime: z.number(),
  memory: z.object({
    used: z.number(),
    total: z.number(),
    percentage: z.number(),
  }),
  redis: z.object({
    connected: z.boolean(),
    hits: z.number(),
    misses: z.number(),
    keys: z.number(),
    memory: z.number(),
  }),
  rabbitmq: z.object({
    connected: z.boolean(),
    queues: z.array(
      z.object({
        name: z.string(),
        messages: z.number(),
        consumers: z.number(),
      }),
    ),
  }),
  responseTime: z.number(),
})


// Analytics event schema
export const analyticsEventSchema = z.object({
  event: z.enum(["page_view", "contact_form_submit", "project_view", "code_run"]),
  page: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string(),
  userAgent: z.string().optional(),
  ip: z.string().optional(),
})

// Email queue job schema
export const emailJobSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  html: z.string(),
  text: z.string().optional(),
  from: z.string().email().optional(),
  replyTo: z.string().email().optional(),
})

// Export types for use throughout the application
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type GitHubUser = z.infer<typeof githubUserSchema>
export type GitHubRepo = z.infer<typeof githubRepoSchema>
export type SystemStatus = z.infer<typeof systemStatusSchema>
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>
export type EmailJob = z.infer<typeof emailJobSchema>
