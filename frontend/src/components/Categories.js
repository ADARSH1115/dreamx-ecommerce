'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { API_URL } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/categories'
import Card from '@/components/ui/Card'

export default function Categories() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/categories`)
        const data = await response.json()
        if (data.success) {
          setCounts(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch category counts:', error)
      }
    }
    fetchCounts()
  }, [])

  return (
    <section className="py-24 sm:py-28 bg-surface dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Explore our wide range of product categories and find exactly what you&apos;re looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(({ name, icon: Icon, description }) => (
            <Link key={name} href={`/products?category=${encodeURIComponent(name)}`}>
              <Card hover className="group h-full p-6 flex flex-col">
                <div className="p-3 rounded-2xl bg-primary-50 text-primary-600 w-fit group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 dark:bg-primary-500/10">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-semibold mt-4 group-hover:text-primary-600 transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted mt-1 flex-1">{description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-primary-600">
                    {counts[name] ?? 0} items
                  </span>
                  <ArrowRight size={16} className="text-muted group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
          >
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
