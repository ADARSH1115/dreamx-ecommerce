'use client'
import { motion } from 'framer-motion'

const BRANDS = ['Apple', 'Sony', 'Nike', 'Adidas', 'Samsung', 'Puma', 'JBL']

export default function TrendingBrands() {
  return (
    <section className="py-16 border-y border-border/60 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-muted uppercase tracking-wide mb-8">
          Trusted Brands, All in One Place
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {BRANDS.map((brand) => (
            <motion.span
              key={brand}
              whileHover={{ scale: 1.08 }}
              className="text-2xl font-bold text-gray-400 hover:text-dark dark:text-gray-600 dark:hover:text-white transition-colors cursor-default"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
