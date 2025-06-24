import { createSafeActionClient } from "next-safe-action"
import { logError } from "./errors"

export const actionClient = createSafeActionClient({
  // Global error handling
  handleReturnedServerError(e) {
    logError(e, "Server action error")

    // Don't leak sensitive errors to client
    if (process.env.NODE_ENV === "production") {
      return "An unexpected error occurred. Please try again."
    }

    return e.message
  },

  // Global middleware for logging and authentication
  defineMetadataSchema() {
    return {
      actionName: "" as string,
      requiresAuth: false as boolean,
    }
  },
}).use(async ({ next, metadata }) => {
  const start = Date.now()

  console.log(`🚀 Action started: ${metadata.actionName}`)

  const result = await next()

  const duration = Date.now() - start
  console.log(`✅ Action completed: ${metadata.actionName} (${duration}ms)`)

  return result
})

// Authenticated action client (for future use)
export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  if (metadata.requiresAuth) {
    // Add authentication logic here
    // const session = await getServerSession()
    // if (!session) throw new Error("Authentication required")
  }

  return next()
})
