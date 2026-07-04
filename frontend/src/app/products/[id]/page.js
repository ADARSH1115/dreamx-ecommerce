'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingBag,
  Heart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { API_URL } from '@/lib/apiClient'
import { addRecentlyViewed, getRecentlyViewedIds } from '@/lib/recentlyViewed'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/ui/Button'

const TABS = ['Description', 'Specifications', 'Reviews']

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('Description')
  const [recommended, setRecommended] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    if (!params.id) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/products/${params.id}`)
        const data = await response.json()
        if (data.success) {
          setProduct(data.data)
          addRecentlyViewed(data.data._id)

          const recResponse = await fetch(
            `${API_URL}/api/products?category=${encodeURIComponent(data.data.category)}&exclude=${data.data._id}&limit=4`
          )
          const recData = await recResponse.json()
          if (recData.success) setRecommended(recData.data.products)

          const viewedIds = getRecentlyViewedIds().filter((id) => id !== data.data._id)
          if (viewedIds.length > 0) {
            const viewedResults = await Promise.all(
              viewedIds.slice(0, 4).map((id) => fetch(`${API_URL}/api/products/${id}`).then((r) => r.json()))
            )
            setRecentlyViewed(viewedResults.filter((r) => r.success).map((r) => r.data))
          }
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product || !product.inStock) return
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setQuantity(1)
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 1)) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="h-12 w-12 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-muted mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Button href="/products">Back to Products</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-dark">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 dark:bg-white/5 mb-4">
              {product.images?.[selectedImage]?.url && (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <Image src={image.url} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-primary-600 font-medium text-sm">{product.category}</span>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

            <div className="flex items-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating?.average || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                />
              ))}
              <span className="text-muted text-sm">
                {product.rating?.average || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-muted line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-50 text-danger px-2 py-1 rounded-lg text-sm font-semibold dark:bg-red-500/10">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted leading-relaxed mt-6">{product.description}</p>

            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-medium text-sm">Quantity:</span>
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2.5 text-muted hover:text-dark disabled:opacity-40"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stockQuantity || 1)}
                    className="p-2.5 text-muted hover:text-dark disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-muted">{product.stockQuantity || 0} available</span>
              </div>

              <div className="flex gap-3">
                <Button
                  icon={ShoppingBag}
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={isWishlisted(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="p-3 border border-border rounded-2xl hover:border-primary-500 transition-colors"
                >
                  <Heart size={22} className={isWishlisted(product._id) ? 'fill-danger text-danger' : ''} />
                </button>
              </div>
            </div>

            <div className="border-t border-border/60 dark:border-white/10 pt-6 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                [Truck, 'Free Shipping', 'On orders over $100'],
                [ShieldCheck, 'Secure Payment', 'SSL encrypted'],
                [RefreshCw, 'Easy Returns', '30-day policy'],
              ].map(([Icon, title, desc]) => (
                <div key={title} className="flex items-center gap-3">
                  <Icon className="text-primary-600 shrink-0" size={22} />
                  <div>
                    <p className="font-medium text-sm">{title}</p>
                    <p className="text-xs text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 bg-card dark:bg-white/5 rounded-3xl border border-border/60 dark:border-white/10 p-8">
          <div className="border-b border-border/60 dark:border-white/10 mb-6">
            <nav className="flex gap-8">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-muted hover:text-dark dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'Description' && (
            <p className="text-muted leading-relaxed">{product.description}</p>
          )}

          {activeTab === 'Specifications' && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(product.specifications || []).length === 0 ? (
                <p className="text-muted">No specifications listed for this product.</p>
              ) : (
                product.specifications.map((spec) => (
                  <div key={spec.name} className="flex justify-between border-b border-border/60 dark:border-white/10 py-2">
                    <dt className="text-muted">{spec.name}</dt>
                    <dd className="font-medium">{spec.value}</dd>
                  </div>
                ))
              )}
            </dl>
          )}

          {activeTab === 'Reviews' && (
            <div className="space-y-4">
              {(product.reviews || []).length === 0 ? (
                <p className="text-muted">No reviews yet. Be the first to review this product.</p>
              ) : (
                product.reviews.map((review, i) => (
                  <div key={i} className="border-b border-border/60 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                      ))}
                      <span className="text-sm font-medium">{review.user?.name || 'Anonymous'}</span>
                    </div>
                    <p className="text-sm text-muted">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Recommended */}
        {recommended.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
