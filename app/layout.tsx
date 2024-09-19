import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stephen Adei Services',
  description: 'Explore our range of services, from personalized tutoring to professional photography and data consultancy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}