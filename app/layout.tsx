import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DateProvider } from "@/context/date-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Company Dashboard",
  description: "Real-time company dashboard with editable dates",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DateProvider>{children}</DateProvider>
      </body>
    </html>
  )
}
