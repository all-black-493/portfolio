// Centralized error messages for consistent user experience
export const ERROR_MESSAGES = {
  // Contact form errors
  CONTACT_FORM: {
    REQUIRED_FIELDS: "All fields are required. Please fill out the complete form.",
    INVALID_EMAIL: "Please enter a valid email address.",
    SUBMISSION_FAILED: "Failed to send message. Please try again or contact me directly.",
    NETWORK_ERROR: "Network error occurred. Please check your connection and try again.",
    SERVER_ERROR: "Server error occurred. Please try again later.",
    RATE_LIMITED: "Too many requests. Please wait a moment before trying again.",
  },

  // API errors
  API: {
    UNAUTHORIZED: "Authentication required. Please log in and try again.",
    FORBIDDEN: "You don't have permission to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    INTERNAL_ERROR: "An unexpected error occurred. Please try again later.",
    VALIDATION_ERROR: "Invalid data provided. Please check your input.",
    TIMEOUT: "Request timed out. Please try again.",
  },

  // GitHub API errors
  GITHUB: {
    FETCH_FAILED: "Failed to fetch GitHub data. Please try again later.",
    RATE_LIMITED: "GitHub API rate limit exceeded. Please try again later.",
    REPOSITORY_NOT_FOUND: "Repository not found or is private.",
  },

  // General errors
  GENERAL: {
    UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
    NETWORK_UNAVAILABLE: "Network connection unavailable. Please check your internet connection.",
    BROWSER_NOT_SUPPORTED: "Your browser doesn't support this feature. Please update your browser.",
  },
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  CONTACT_FORM: {
    MESSAGE_SENT: "Message sent successfully!",
    MESSAGE_SENT_DESCRIPTION: "Thank you for reaching out. I'll get back to you within 24 hours.",
  },

  GENERAL: {
    COPIED_TO_CLIPBOARD: "Copied to clipboard!",
    DOWNLOAD_STARTED: "Download started successfully.",
  },
} as const

// Info messages
export const INFO_MESSAGES = {
  CONTACT_FORM: {
    SENDING: "Sending your message...",
    PROCESSING: "Processing your request...",
  },

  GENERAL: {
    LOADING: "Loading...",
    PLEASE_WAIT: "Please wait while we process your request.",
  },
} as const

// Developer error logging utility
export const logError = (error: unknown, context?: string) => {
  const errorInfo = {
    message: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "Server",
    url: typeof window !== "undefined" ? window.location.href : "Server",
  }

  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.error("Error logged:", errorInfo)
  }

  // In production, you would send this to your error tracking service
  // Example: Sentry, LogRocket, DataDog, etc.
  if (process.env.NODE_ENV === "production") {
    // sendToErrorTrackingService(errorInfo)
  }

  return errorInfo
}

// Error boundary helper
export const handleApiError = (error: unknown, context?: string) => {
  logError(error, context)

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes("fetch")) {
      return ERROR_MESSAGES.GENERAL.NETWORK_UNAVAILABLE
    }

    if (error.message.includes("timeout")) {
      return ERROR_MESSAGES.API.TIMEOUT
    }

    return error.message
  }

  return ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR
}
