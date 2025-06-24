import { Channel, Options } from "amqplib"
import * as amqp from "amqplib"
import { logError } from "./errors"
import type { EmailJob, AnalyticsEvent } from "./validations"

export const QUEUES = {
    EMAIL: "email_queue",
    ANALYTICS: "analytics_queue",
    NOTIFICATIONS: "notifications_queue",
} as const

class RabbitMQClient {
    private connection: amqp.ChannelModel | null = null
    private channel: Channel | null = null
    private isConnected = false

    constructor() {
        this.connect()
    }

    private async connect() {
        try {
            if (!process.env.RABBITMQ_URL) {
                console.warn("RabbitMQ URL not configured, message queuing disabled")
                return
            }

            console.log("🐰 Connecting to RabbitMQ...")

            this.connection = await amqp.connect(process.env.RABBITMQ_URL)
            this.channel = await this.connection?.createChannel()

            this.connection?.on("error", (error) => {
                console.error("❌ RabbitMQ connection error:", error)
                logError(error, "RabbitMQ connection")
                this.isConnected = false
            })

            this.connection.on("close", () => {
                console.log("🔌 RabbitMQ connection closed")
                this.isConnected = false
            })

            await this.setupQueues()

            this.isConnected = true
            console.log("✅ RabbitMQ connected successfully")
        } catch (error) {
            logError(error, "RabbitMQ initialization")
            this.isConnected = false
        }
    }

    private async setupQueues() {
        if (!this.channel) return

        const queueOptions: Options.AssertQueue = {
            durable: true,
            arguments: {
                "x-message-ttl": 24 * 60 * 60 * 1000, // 24 hours
                "x-max-retries": 3,
            },
        }

        for (const queueName of Object.values(QUEUES)) {
            await this.channel.assertQueue(queueName, queueOptions)
            console.log(`📋 Queue declared: ${queueName}`)
        }

        await this.channel.assertExchange("dlx", "direct", { durable: true })
        await this.channel.assertQueue("dead_letter_queue", { durable: true })
        await this.channel.bindQueue("dead_letter_queue", "dlx", "failed")
    }

    async publishEmail(emailJob: EmailJob): Promise<boolean> {
        return this.publish(QUEUES.EMAIL, emailJob)
    }

    async publishAnalytics(event: AnalyticsEvent): Promise<boolean> {
        return this.publish(QUEUES.ANALYTICS, event)
    }

    async publishNotification(notification: unknown): Promise<boolean> {
        return this.publish(QUEUES.NOTIFICATIONS, notification)
    }

    private async publish(queue: string, message: unknown): Promise<boolean> {
        if (!this.channel || !this.isConnected) {
            console.warn(`⚠️ Cannot publish to ${queue}: RabbitMQ not connected`)
            return false
        }

        try {
            const messageBuffer = Buffer.from(JSON.stringify(message))
            const published = this.channel.sendToQueue(queue, messageBuffer, {
                persistent: true,
                timestamp: Date.now(),
                messageId: crypto.randomUUID(),
            })

            if (published) {
                console.log(`📤 Message published to ${queue}`)
                return true
            } else {
                console.warn(`⚠️ Failed to publish message to ${queue}: Queue full`)
                return false
            }
        } catch (error) {
            logError(error, `RabbitMQ publish to ${queue}`)
            return false
        }
    }

    async getQueueStats() {
        if (!this.channel || !this.isConnected) {
            return {
                connected: false,
                queues: [],
            }
        }

        try {
            const queues: { name: string; messages: number; consumers: number }[] = []

            for (const queueName of Object.values(QUEUES)) {
                const queueInfo = await this.channel.checkQueue(queueName)
                queues.push({
                    name: queueName,
                    messages: queueInfo.messageCount,
                    consumers: queueInfo.consumerCount,
                })
            }

            return {
                connected: true,
                queues,
            }
        } catch (error) {
            logError(error, "RabbitMQ queue stats")
            return {
                connected: false,
                queues: [],
            }
        }
    }

    async startEmailWorker() {
        if (!this.channel || !this.isConnected) return

        console.log("👷 Starting email worker...")

        await this.channel.consume(
            QUEUES.EMAIL,
            async (msg) => {
                if (!msg) return

                try {
                    const emailJob: EmailJob = JSON.parse(msg.content.toString())
                    console.log(`📧 Processing email job: ${emailJob.subject}`)

                    await this.processEmailJob(emailJob)

                    this.channel?.ack(msg)
                    console.log("✅ Email job completed")
                } catch (error) {
                    logError(error, "Email worker processing")
                    this.channel?.nack(msg, false, false)
                }
            },
            { noAck: false },
        )
    }

    async startAnalyticsWorker() {
        if (!this.channel || !this.isConnected) return

        console.log("📊 Starting analytics worker...")

        await this.channel.consume(
            QUEUES.ANALYTICS,
            async (msg) => {
                if (!msg) return

                try {
                    const event: AnalyticsEvent = JSON.parse(msg.content.toString())
                    console.log(`📈 Processing analytics event: ${event.event}`)

                    await this.processAnalyticsEvent(event)

                    this.channel?.ack(msg)
                } catch (error) {
                    logError(error, "Analytics worker processing")
                    this.channel?.nack(msg, false, false)
                }
            },
            { noAck: false },
        )
    }

    private async processEmailJob(emailJob: EmailJob) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(`📧 Email sent to ${emailJob.to}: ${emailJob.subject}`)
    }

    private async processAnalyticsEvent(event: AnalyticsEvent) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        console.log(`📊 Analytics event processed: ${event.event}`)
    }

    async disconnect() {
        try {
            if (this.channel) {
                await this.channel.close()
            }
            if (this.connection) {
                await this.connection.close()
            }
            this.isConnected = false
            console.log("🐰 RabbitMQ disconnected")
        } catch (error) {
            logError(error, "RabbitMQ disconnect")
        }
    }
}

export const rabbitmq = new RabbitMQClient()

if (process.env.NODE_ENV === "production") {
    rabbitmq.startEmailWorker()
    rabbitmq.startAnalyticsWorker()
}
