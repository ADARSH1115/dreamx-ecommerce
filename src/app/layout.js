import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import NextAuthProvider from '@/components/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DreamX - Premium Ecommerce Store',
  description: 'Discover amazing products at unbeatable prices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster position="top-right" />
            </CartProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
