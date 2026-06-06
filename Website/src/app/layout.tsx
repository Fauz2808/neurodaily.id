import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Neuro Daily — Ilmu Otak untuk Kehidupan Sehari-hari',
    template: '%s | Neuro Daily',
  },
  description:
    'Neuro Daily menghadirkan neurosains dan psikologi dalam bahasa yang mudah dipahami. Belajar tentang otak, kebiasaan, tidur, fokus, dan emosi.',
  keywords: ['neurosains', 'psikologi', 'otak', 'kebiasaan', 'tidur', 'fokus', 'emosi', 'produktivitas'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Neuro Daily',
    title: 'Neuro Daily — Ilmu Otak untuk Kehidupan Sehari-hari',
    description:
      'Neuro Daily menghadirkan neurosains dan psikologi dalam bahasa yang mudah dipahami.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neuro Daily',
    description: 'Ilmu Otak untuk Kehidupan Sehari-hari',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
