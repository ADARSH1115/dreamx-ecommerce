'use client'
import { useState, useEffect } from 'react'
import { API_URL } from '@/lib/apiClient'
import ProductCard from '@/components/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'

export default function BestSellers() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/best-sellers?limit=4`)
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch best sellers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBestSellers()
  }, [])

  // Ranked from real order history — if nobody has bought anything yet,
  // there's nothing honest to show here.
  if (!loading && products.length === 0) return null

  return (
    <section className="py-24 sm:py-28 bg-surface dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            The products our customers keep coming back for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => <ProductCard key={product._id} product={product} bestseller />)}
        </div>
      </div>
    </section>
  )
}
