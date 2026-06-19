import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'

const kanit = Kanit({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Bus Conductor',
  description: 'Spatial conductor control for boarding, navigation & revenue',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0C0C0C',
  userScalable: false,
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${kanit.variable} dark bg-[#0C0C0C]`}>
      <body className="font-sans antialiased bg-[#0C0C0C]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
