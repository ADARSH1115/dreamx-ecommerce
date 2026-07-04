'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Grid, List } from 'lucide-react'
import { API_URL } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/categories'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'

const CATEGORY_OPTIONS = ['All', ...CATEGORIES.map((c) => c.name)]

function ProductsPageInner() {
  const searchParams = useSearchParams()

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=50`)
        const data = await response.json()
        if (data.success) {
          setProducts(data.data.products)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-dark">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-muted mt-1">Discover our complete collection of premium products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-soft border border-border/60 p-6 sticky top-24 dark:bg-white/5 dark:border-white/10">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-9 h-11"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field h-11"
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl shadow-soft border border-border/60 p-4 mb-6 dark:bg-white/5 dark:border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-muted text-sm">{filteredProducts.length} products</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' : 'text-muted'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' : 'text-muted'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field h-11 w-auto"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageInner />
    </Suspense>
  )
}
