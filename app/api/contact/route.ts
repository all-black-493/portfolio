import { type NextRequest, NextResponse } from "next/server"
import { ERROR_MESSAGES, logError } from "@/lib/errors"

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per window
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitStore.get(identifier)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return true
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for")
    const identifier =
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ??
      request.headers.get("x-real-ip") ??
      "anonymous"
    if (!checkRateLimit(identifier)) {
      logError(new Error("Rate limit exceeded"), `Contact form - IP: ${identifier}`)
      return NextResponse.json({ error: ERROR_MESSAGES.CONTACT_FORM.RATE_LIMITED }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: ERROR_MESSAGES.CONTACT_FORM.REQUIRED_FIELDS }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: ERROR_MESSAGES.CONTACT_FORM.INVALID_EMAIL }, { status: 400 })
    }

    // Validate field lengths
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: ERROR_MESSAGES.API.VALIDATION_ERROR }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log successful submission (in production, save to database)
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
      ip: identifier,
    })

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send auto-reply to user

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours.",
    })
  } catch{
    // const errorMessage = handleApiError(error, "Contact form submission")

    return NextResponse.json({ error: ERROR_MESSAGES.CONTACT_FORM.SUBMISSION_FAILED }, { status: 500 })
  }
}
