'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button'

const TRUST_BADGES = [
  { icon: Truck, label: 'Free Shipping' },
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: RefreshCw, label: 'Easy Returns' },
]

const COLLAGE_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    alt: 'Wireless headphones',
    className: 'top-0 left-4 w-36 sm:w-44',
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    alt: 'Sneakers',
    className: 'top-24 right-0 w-32 sm:w-40',
    delay: 0.4,
  },
  {
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    alt: 'Smart watch',
    className: 'bottom-24 left-0 w-28 sm:w-36',
    delay: 0.8,
  },
  {
    src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    alt: 'Laptop',
    className: 'bottom-0 right-8 w-36 sm:w-44',
    delay: 1.2,
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface dark:bg-dark">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-100 blur-3xl opacity-60 dark:bg-primary-500/10" />
      <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-accent-100 blur-3xl opacity-60 dark:bg-accent-500/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-dark dark:text-white">
              Discover Products
              <br />
              Designed Around
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Your Lifestyle
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted max-w-lg">
              Curated essentials, thoughtfully made and delivered with care —
              shop premium quality without the premium hassle.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/products" size="lg">Shop Now</Button>
              <Button href="/products" variant="secondary" size="lg">Explore Collections</Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted">
                  <Icon size={18} className="text-primary-600" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative hidden lg:block h-[420px]">
            {COLLAGE_ITEMS.map((item) => (
              <motion.div
                key={item.alt}
                className={`absolute ${item.className}`}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
              >
                <div className="rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-lift p-3">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                    <Image src={item.src} alt={item.alt} fill sizes="200px" className="object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
