import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UmamiScript from "@pigna-labs/ui/umami"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Choco World',
  description: 'Play with your friendly chocobo!',
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <UmamiScript />
      </body>
    </html>
  )
}
