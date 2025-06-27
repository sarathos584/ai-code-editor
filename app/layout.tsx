import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Component Generator - Create React Components with Natural Language",
  description:
    "Generate beautiful, responsive React components using AI. Describe your component in plain English and get production-ready code instantly.",
  keywords: ["React", "AI", "Component Generator", "Next.js", "Tailwind CSS", "Code Generation"],
  authors: [{ name: "AI Component Generator" }],
  openGraph: {
    title: "AI Component Generator",
    description: "Generate React components with natural language using AI",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
