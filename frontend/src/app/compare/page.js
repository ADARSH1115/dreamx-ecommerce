'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Scale } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/ui/Button'
import { API_URL } from '@/lib/apiClient'
import { getCompareIds, toggleCompare } from '@/lib/compare'

export default function ComparePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadProducts = useCallback(async () => {
    const ids = getCompareIds()
    if (ids.length === 0) {
      setProducts([])
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const results = await Promise.all(
        ids.map((id) => fetch(`${API_URL}/api/products/${id}`).then((r) => r.json()))
      )
      setProducts(results.filter((r) => r.success).map((r) => r.data))
    } catch (error) {
      console.error('Failed to load comparison products:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
    window.addEventListener('compare-updated', loadProducts)
    return () => window.removeEventListener('compare-updated', loadProducts)
  }, [loadProducts])

  const remove = (id) => {
    toggleCompare(id)
    setProducts((prev) => prev.filter((p) => p._id !== id))
  }

  const specKeys = Array.from(
    new Set(products.flatMap((p) => (p.specifications || []).map((s) => s.name)))
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Compare Products</h1>

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <Scale className="mx-auto text-muted mb-4" size={48} />
            <p className="text-lg font-medium mb-2">No products to compare</p>
            <p className="text-muted mb-6">Add products from the shop using the &ldquo;Compare&rdquo; button on any product card.</p>
            <Button href="/products">Browse Products</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-40" />
                  {products.map((product) => (
                    <th key={product._id} className="text-left align-top p-4 min-w-[200px]">
                      <div className="relative">
                        <button
                          onClick={() => remove(product._id)}
                          aria-label="Remove from comparison"
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-soft"
                        >
                          <X size={14} />
                        </button>
                        <Link href={`/products/${product._id}`} className="block">
                          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3">
                            {product.images?.[0]?.url && (
                              <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                            )}
                          </div>
                          <p className="font-semibold">{product.name}</p>
                        </Link>
                        <p className="text-primary-600 font-bold mt-1">${product.price.toFixed(2)}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 text-sm font-medium text-muted">Brand</td>
                  {products.map((p) => <td key={p._id} className="p-4 text-sm">{p.brand || '—'}</td>)}
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-muted">Category</td>
                  {products.map((p) => <td key={p._id} className="p-4 text-sm">{p.category}</td>)}
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-muted">Rating</td>
                  {products.map((p) => (
                    <td key={p._id} className="p-4 text-sm">
                      {p.rating?.average?.toFixed(1) || '0.0'} ({p.rating?.count || 0})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-muted">In Stock</td>
                  {products.map((p) => (
                    <td key={p._id} className="p-4 text-sm">{p.inStock ? 'Yes' : 'No'}</td>
                  ))}
                </tr>
                {specKeys.map((key) => (
                  <tr key={key}>
                    <td className="p-4 text-sm font-medium text-muted">{key}</td>
                    {products.map((p) => {
                      const spec = (p.specifications || []).find((s) => s.name === key)
                      return <td key={p._id} className="p-4 text-sm">{spec?.value || '—'}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
