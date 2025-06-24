import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Jeremy Nyangi - Full-Stack Developer",
  description:
    "Building the future, one line of code at a time.",
  keywords: ["full-stack developer", "react", "nodejs", "typescript", "portfolio"],
  authors: [{ name: "Jeremy Nyangi" }],
  creator: "Jeremy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jeremyn.dev",
    title: "Jeremy Nyangi - Full-Stack Developer",
    description: "Award-winning full-stack developer portfolio",
    siteName: "Jeremy's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremy Nyangi - Full-Stack Developer",
    description: "Full-stack developer portfolio",
    creator: "@okellojeremy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen bg-background">
            <Navigation />
            <main className="relative">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
            toastOptions={{
              style: {
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
