# 🚀 Enterprise Portfolio - Advanced System Design

A production-ready, enterprise-grade portfolio showcasing advanced full-stack architecture with distributed systems, caching, message queues, and comprehensive observability.

## 🏗️ System Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │────│   Redis Cache   │    │   RabbitMQ      │
│                 │    │                 │    │   Message Queue │
│ • Server Actions│    │ • API Caching   │    │                 │
│ • Type Safety   │    │ • Rate Limiting │    │ • Email Jobs    │
│ • Validation    │    │ • Session Store │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  System Status  │
                    │   Dashboard     │
                    │                 │
                    │ • Health Checks │
                    │ • Metrics       │
                    │ • Monitoring    │
                    └─────────────────┘
\`\`\`

## ✨ Advanced Features

### 🔒 **Type-Safe Server Actions**
- **next-safe-action** with Zod validation
- Full type inference between client and server
- Centralized error handling and logging
- Input sanitization and validation

### ⚡ **Redis Caching Layer**
- API response caching with TTL
- Rate limiting implementation
- Cache hit/miss analytics
- Configurable cache strategies

### 🐰 **RabbitMQ Message Queue**
- Asynchronous email processing
- Analytics event queuing
- Durable queues with retry policies
- Dead letter queue handling

### 📊 **System Observability**
- Real-time system status dashboard
- Redis cache metrics and performance
- RabbitMQ queue monitoring
- Application health checks

### 🐳 **Production DevOps**
- Multi-stage Docker builds
- Docker Compose orchestration
- Health checks and monitoring
- Optimized for production deployment

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 15** - App Router with Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations

### **Backend Architecture**
- **next-safe-action** - Type-safe server actions
- **Zod** - Runtime type validation
- **Redis** - High-performance caching
- **RabbitMQ** - Message queue system

### **Developer Experience**
- **Sonner** - Toast notifications
- **shadcn/ui** - Component library
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **pnpm 8+**
- **Docker & Docker Compose**

### 1. Clone & Install

\`\`\`bash
git clone https://github.com/yourusername/enterprise-portfolio.git
cd enterprise-portfolio
pnpm install
\`\`\`

### 2. Environment Setup

\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your configuration
\`\`\`

### 3. Start Infrastructure Services

\`\`\`bash
# Start Redis and RabbitMQ
pnpm services:start

# Or start everything with Docker Compose
pnpm docker:dev
\`\`\`

### 4. Development Server

\`\`\`bash
pnpm dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Development Environment

\`\`\`bash
# Start all services in development mode
pnpm docker:dev

# View logs
pnpm docker:logs

# Stop services
pnpm docker:down
\`\`\`

### Production Deployment

\`\`\`bash
# Build and start production environment
pnpm docker:prod

# Scale the application
docker-compose up --scale app=3
\`\`\`

## 📊 System Monitoring

### System Status Dashboard
Visit `/system-status` to view:
- Application uptime and memory usage
- Redis cache performance metrics
- RabbitMQ queue depths and processing stats
- Real-time health monitoring

### RabbitMQ Management UI
- **URL**: http://localhost:15672
- **Username**: admin
- **Password**: password

### Redis Monitoring
\`\`\`bash
# Connect to Redis CLI
docker exec -it portfolio-redis redis-cli

# View cache stats
INFO memory
INFO stats
\`\`\`

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm docker:dev` | Start development with Docker |
| `pnpm docker:prod` | Start production with Docker |
| `pnpm services:start` | Start Redis & RabbitMQ only |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript compiler |
| `pnpm test` | Run Jest tests |

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── actions/           # Server actions with validation
│   ├── api/              # API routes
│   ├── system-status/    # System monitoring dashboard
│   └── ...
├── lib/
│   ├── validations.ts    # Zod schemas
│   ├── redis.ts          # Redis client & caching
│   ├── rabbitmq.ts       # Message queue client
│   ├── safe-actions.ts   # Action client setup
│   └── errors.ts         # Centralized error handling
├── components/           # React components
├── docker-compose.yml    # Production orchestration
├── docker-compose.dev.yml # Development orchestration
└── Dockerfile           # Multi-stage build
\`\`\`

## 🔒 Security Features

### **Input Validation**
- Zod schema validation for all inputs
- SQL injection prevention
- XSS protection with sanitization

### **Rate Limiting**
- Redis-based rate limiting
- Configurable limits per endpoint
- IP-based tracking

### **Error Handling**
- Centralized error logging
- Sanitized error responses
- Development vs production error modes

## ⚡ Performance Optimizations

### **Caching Strategy**
- API response caching with Redis
- Intelligent cache invalidation
- Cache warming for critical data

### **Async Processing**
- Non-blocking email sending
- Background analytics processing
- Queue-based task distribution

### **Resource Optimization**
- Docker multi-stage builds
- Image optimization
- Bundle analysis and splitting

## 📈 Monitoring & Observability

### **Application Metrics**
- Memory usage tracking
- Response time monitoring
- Error rate analysis

### **Infrastructure Metrics**
- Redis cache hit/miss ratios
- RabbitMQ queue depths
- Docker container health

### **Business Metrics**
- Contact form submissions
- Page view analytics
- User engagement tracking

## 🚀 Deployment Options

### **Vercel (Recommended)**
\`\`\`bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
# Deploy Redis/RabbitMQ separately (Redis Cloud, CloudAMQP)
\`\`\`

### **Docker Production**
\`\`\`bash
# Build production image
docker build -t portfolio .

# Run with external services
docker run -p 3000:3000 \
  -e REDIS_URL=redis://your-redis-host:6379 \
  -e RABBITMQ_URL=amqp://user:pass@your-rabbitmq-host:5672 \
  portfolio
\`\`\`

### **Kubernetes**
\`\`\`yaml
# Example Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
      - name: portfolio
        image: portfolio:latest
        ports:
        - containerPort: 3000
        env:
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        - name: RABBITMQ_URL
          value: "amqp://user:pass@rabbitmq-service:5672"
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [next-safe-action](https://next-safe-action.dev/) - Type-safe server actions
- [Redis](https://redis.io/) - In-memory data structure store
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker
- [Zod](https://zod.dev/) - TypeScript-first schema validation

---

**Built with ❤️ by [Alex Chen](https://github.com/alexchen)**

*Showcasing enterprise-grade full-stack architecture with distributed systems, type safety, and production-ready DevOps practices.*
