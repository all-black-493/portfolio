import { createSafeActionClient } from "next-safe-action"
import { logError } from "./errors"
import { z } from "zod"

export const actionClient = createSafeActionClient({
  handleServerError(e: unknown) {
    if (e instanceof Error) {
      logError(e, "Server action error")
      if (process.env.NODE_ENV === "production") {
        return "An unexpected error occurred. Please try again."
      }
      return e.message
    }
    return "An unknown error occurred."
  },

  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
      requiresAuth: z.boolean(),
    })
  },
}).use(async ({ next, metadata }) => {
  const start = Date.now()

  if (metadata) {
    console.log(`🚀 Action started: ${metadata.actionName}`)
  }

  const result = await next()

  const duration = Date.now() - start

  if (metadata) {
    console.log(`✅ Action completed: ${metadata.actionName} (${duration}ms)`)
  }

  return result
})

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  if (metadata?.requiresAuth) {
    // Add authentication logic here
  }
  return next()
})
