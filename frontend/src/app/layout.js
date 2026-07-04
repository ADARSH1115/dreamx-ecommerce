import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { WishlistProvider } from '@/context/WishlistContext'
import CartDrawer from '@/components/CartDrawer'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DreamX - Premium Ecommerce Store',
  description: 'Discover amazing products at unbeatable prices',
}

// Runs before paint to avoid a light-mode flash for users who prefer dark.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('dreamx_theme');
    var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
              <CartDrawer />
              <BackToTop />
              <Toaster position="top-right" />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
