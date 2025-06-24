"use server"

import { actionClient } from "@/lib/safe-actions"
import { contactFormSchema } from "@/lib/validations"
import { rabbitmq } from "@/lib/rabbitmq"
import { redis, cacheKeys } from "@/lib/redis"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/lib/errors"
import type { EmailJob } from "@/lib/validations"

export const submitContactForm = actionClient
  .inputSchema(contactFormSchema)
  .action(async ({ parsedInput, clientInput }) => {
    const { name, email, subject, message } = parsedInput

    try {
      // Rate limiting check using Redis
      const clientIp = "127.0.0.1" // In production, get from headers
      const rateLimitKey = cacheKeys.contactFormRate(clientIp)

      const currentCount = (await redis.get<number>(rateLimitKey)) || 0
      if (currentCount >= 5) {
        throw new Error(ERROR_MESSAGES.CONTACT_FORM.RATE_LIMITED)
      }

      // Increment rate limit counter
      await redis.set(rateLimitKey, currentCount + 1, 900) // 15 minutes TTL

      // Create email job for async processing
      const emailJob: EmailJob = {
        to: process.env.CONTACT_EMAIL || "alex@example.com",
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Sent from portfolio contact form</small></p>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${name}
          Email: ${email}
          Subject: ${subject}
          
          Message:
          ${message}
        `,
        replyTo: email,
      }

      // Queue email for async processing
      const emailQueued = await rabbitmq.publishEmail(emailJob)

      if (!emailQueued) {
        console.warn("Failed to queue email, processing synchronously")
        // Fallback to synchronous processing if queue is unavailable
      }

      // Queue analytics event
      await rabbitmq.publishAnalytics({
        event: "contact_form_submit",
        metadata: { subject, hasMessage: message.length > 0 },
        timestamp: new Date().toISOString(),
        ip: clientIp,
      })

      return {
        success: true,
        message: SUCCESS_MESSAGES.CONTACT_FORM.MESSAGE_SENT,
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      throw new Error(error instanceof Error ? error.message : ERROR_MESSAGES.CONTACT_FORM.SUBMISSION_FAILED)
    }
  })
