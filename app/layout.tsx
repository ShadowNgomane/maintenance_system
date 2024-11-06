
import MaintenanceLayout from "./components/layouts/maintenance-layout"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Maintenance Manager',
  description: 'Equipment maintenance and work order management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MaintenanceLayout>
          {children}
        </MaintenanceLayout>
      </body>
    </html>
  )
}
