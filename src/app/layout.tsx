import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DietProvider } from '@/context/DietContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Super Diet AI - Rekomendasi Diet Berbasis Kecerdasan Buatan',
  description: 'Platform kecerdasan buatan terdepan untuk memberikan rekomendasi diet yang dipersonalisasi sesuai dengan kebutuhan dan tujuan kesehatan Anda.',
  keywords: 'diet, AI, kecerdasan buatan, kesehatan, nutrisi, rekomendasi makanan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <DietProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </DietProvider>
      </body>
    </html>
  )
}

