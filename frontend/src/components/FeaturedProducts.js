'use client'
import { useState, useEffect } from 'react'
import { API_URL } from '@/lib/apiClient'
import ProductCard from '@/components/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=6&sort=rating`)
        const data = await response.json()
        if (data.success) {
          setProducts(data.data.products)
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="py-24 sm:py-28 bg-card dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with exclusive deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>

        {!loading && products.length === 0 && (
          <p className="text-center text-muted">No featured products yet.</p>
        )}

        <div className="text-center mt-12">
          <Button href="/products" variant="secondary">View All Products</Button>
        </div>
      </div>
    </section>
  )
}
