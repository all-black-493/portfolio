import { createSafeActionClient } from "next-safe-action"
import { logError } from "./errors"
import { z } from "zod"

const metadataSchema = z.object({
  actionName: z.string(),
})

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    logError(e, "Server action error")

    return e.message
  },

  defineMetadataSchema() {
    return metadataSchema
  }
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

// Authenticated action client
export const authActionClient = actionClient.use(async ({ next, metadata }) => {

  return next()
})
