import { toast } from "sonner"
import type { T } from "some-module" // Assuming T is imported from some module

/**
 * Centralised toast helpers with consistent options.
 * Usage :
 *   showToast.success("Saved!")
 */
export const showToast = {
  success: (message: string, description?: string) => toast.success(message, { description, duration: 4000 }),

  error: (message: string, description?: string) => toast.error(message, { description, duration: 6000 }),

  info: (message: string, description?: string) => toast.info(message, { description, duration: 4000 }),

  loading: (message: string) => toast.loading(message),

  /** Helper that ties a Promise lifecycle to Sonner toasts */
  promise: (
    promise: Promise<T>,
    opts: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((err: unknown) => string)
    },
  ) => toast.promise(promise, opts),
}
