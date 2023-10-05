import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Choco World',
  description: 'Play with your friendly chocobo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
    </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
