import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { getConfig, getBrandedTitle } from '@/lib/config'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

function generateMetadata(): Metadata {
  let config
  try {
    config = getConfig()
  } catch {
    // Fallback if config fails during build
    config = { brandName: process.env.BRAND_NAME }
  }

  const title = getBrandedTitle(config as { brandName?: string })
  const description = 'Secure Discord invite gateway'

  const metadata: Metadata = {
    title,
    description,
  }

  // Add OpenGraph image if background image is configured
  if (process.env.IMAGE_BACKGROUND) {
    metadata.openGraph = {
      title,
      description,
      images: [
        {
          url: process.env.IMAGE_BACKGROUND,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    }
  }

  return metadata
}

export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
