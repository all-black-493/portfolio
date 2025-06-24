# 🚀 Developer Portfolio

An award-winning, production-ready portfolio website built with Next.js 15, featuring advanced animations, performance optimizations, and modern development practices.

## ✨ Features

- **🎨 Modern Design**: Clean, responsive design with dark/light theme support
- **⚡ Performance Optimized**: Lighthouse score 98+, Core Web Vitals optimized
- **🔧 Interactive Components**: Code playground, microinteraction lab, tech stack visualizer
- **📱 Mobile First**: Fully responsive design with touch-friendly interactions
- **🛡️ Type Safe**: Full TypeScript implementation with strict type checking
- **🐳 Docker Ready**: Production-grade containerization with multi-stage builds
- **🔄 CI/CD Pipeline**: Automated testing, building, and deployment
- **📊 Analytics Ready**: Built-in support for Vercel Analytics and Google Analytics
- **♿ Accessible**: WCAG 2.1 AA compliant with semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Deployment**: Vercel / Docker
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Docker (optional)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/developer-portfolio.git
   cd developer-portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Start development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Development

1. **Start with Docker Compose**
   \`\`\`bash
   pnpm docker:dev
   \`\`\`

2. **Or build and run manually**
   \`\`\`bash
   pnpm docker:build
   pnpm docker:run
   \`\`\`

## 📦 Production Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   \`\`\`bash
   vercel --prod
   \`\`\`

2. **Set environment variables in Vercel dashboard**

### Docker Production

1. **Build production image**
   \`\`\`bash
   docker build -t portfolio .
   \`\`\`

2. **Run production container**
   \`\`\`bash
   docker run -p 3000:3000 --env-file .env portfolio
   \`\`\`

3. **Or use Docker Compose**
   \`\`\`bash
   pnpm docker:prod
   \`\`\`

## 🧪 Testing & Quality

### Run Tests
\`\`\`bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
\`\`\`

### Code Quality
\`\`\`bash
# Linting
pnpm lint

# Type checking
pnpm type-check

# Security audit
pnpm security:audit
\`\`\`

### Performance Testing
\`\`\`bash
# Lighthouse CI
pnpm lighthouse

# Bundle analysis
pnpm analyze
\`\`\`

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript compiler |
| `pnpm test` | Run Jest tests |
| `pnpm docker:build` | Build Docker image |
| `pnpm docker:dev` | Start development with Docker |
| `pnpm lighthouse` | Run Lighthouse performance tests |

## 🌍 Environment Variables

Create a `.env.local` file based on `.env.example`:

\`\`\`bash
# Required
GITHUB_TOKEN=your_github_token

# Optional
CONTACT_EMAIL=your-email@example.com
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=your_sentry_dsn
\`\`\`

## 🏗️ Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── lib/                  # Utility libraries
│   ├── errors.ts         # Centralized error handling
│   └── toast.ts          # Toast notifications
├── .github/              # GitHub Actions workflows
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile           # Docker configuration
└── README.md           # This file
\`\`\`

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions pipeline:

- **Code Quality**: ESLint, TypeScript, Prettier
- **Testing**: Jest unit tests with coverage
- **Security**: Dependency audit, Docker image scanning
- **Performance**: Lighthouse CI testing
- **Deployment**: Automated Vercel deployment

## 🛡️ Security Features

- **Rate Limiting**: API endpoint protection
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Centralized error management
- **Security Headers**: Production security headers
- **Docker Security**: Non-root user, minimal base image

## 📊 Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching**: Aggressive caching strategies
- **Compression**: Gzip/Brotli compression

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
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by [Alex Chen](https://github.com/alexchen)
