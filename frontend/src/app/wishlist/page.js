'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, X } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'

export default function WishlistPage() {
  const { loading: authLoading, isAuthenticated } = useRequireAuth()
  const { wishlist, loading, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {loading ? (
          <p className="text-muted">Loading your wishlist...</p>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="mx-auto text-muted mb-4" size={48} />
            <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
            <p className="text-muted mb-6">Save products you love to find them here later.</p>
            <Button href="/products">Browse Products</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <Card key={product._id} hover className="relative overflow-hidden group">
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Remove from wishlist"
                  className="absolute z-10 m-3 p-1.5 rounded-full bg-white/90 shadow-soft hover:bg-white"
                >
                  <X size={16} />
                </button>
                <Link href={`/products/${product._id}`} className="block relative aspect-square bg-gray-50">
                  {product.images?.[0]?.url && (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="font-medium truncate hover:text-primary-600">{product.name}</h3>
                  </Link>
                  <p className="text-primary-600 font-semibold mt-1">${product.price.toFixed(2)}</p>
                  <Button
                    size="sm"
                    icon={ShoppingBag}
                    className="w-full mt-3"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
