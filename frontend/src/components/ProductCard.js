'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Heart, ShoppingBag, Eye, Scale, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { isInCompare, toggleCompare } from '@/lib/compare'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

const NEW_WINDOW_DAYS = 14

export default function ProductCard({ product, bestseller = false }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [inCompare, setInCompare] = useState(false)

  useEffect(() => {
    setInCompare(isInCompare(product._id))
  }, [product._id])

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0

  const isNew =
    product.createdAt &&
    (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= NEW_WINDOW_DAYS

  const isLimited = product.inStock && product.stockQuantity > 0 && product.stockQuantity < 10

  const handleCompareToggle = () => {
    const result = toggleCompare(product._id)
    if (result.limitReached) {
      toast.error('You can compare up to 4 products at a time')
      return
    }
    setInCompare(result.added)
    toast.success(result.added ? 'Added to compare' : 'Removed from compare')
  }

  const image = product.images?.[0]?.url

  return (
    <>
      <Card hover className="relative overflow-hidden group flex flex-col h-full">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discountPercent > 0 && <Badge tone="danger">{discountPercent}% OFF</Badge>}
          {isNew && <Badge tone="success">New</Badge>}
          {bestseller && <Badge tone="accent">Bestseller</Badge>}
          {isLimited && <Badge tone="warning">Limited Edition</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-dark/80 shadow-soft hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={isWishlisted(product._id) ? 'fill-danger text-danger' : 'text-dark dark:text-gray-200'}
          />
        </button>

        <Link href={`/products/${product._id}`} className="relative block aspect-square bg-gray-50 dark:bg-white/5 overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Quick View — appears on hover */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setQuickViewOpen(true)
            }}
            className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/95 dark:bg-dark/90 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            <Eye size={16} /> Quick View
          </button>
        </Link>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{product.brand || product.category}</span>
            <button
              onClick={handleCompareToggle}
              aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
              className={`flex items-center gap-1 hover:text-primary-600 transition-colors ${inCompare ? 'text-primary-600' : ''}`}
            >
              <Scale size={14} /> Compare
            </button>
          </div>

          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold mt-1 line-clamp-2 hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mt-2 text-sm">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-medium">{product.rating?.average?.toFixed(1) || '0.0'}</span>
            <span className="text-muted">({product.rating?.count || 0})</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <Button
            size="sm"
            icon={ShoppingBag}
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            className="w-full mt-3"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Card>

      <Modal open={quickViewOpen} onClose={() => setQuickViewOpen(false)}>
        <div className="grid sm:grid-cols-2 gap-6 p-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
            {image && <Image src={image} alt={product.name} fill className="object-cover" />}
          </div>
          <div>
            <span className="text-xs text-muted">{product.brand || product.category}</span>
            <h2 className="text-xl font-bold mt-1">{product.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-muted line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-muted mt-4 line-clamp-5">{product.description}</p>
            <div className="flex gap-2 mt-6">
              <Button
                icon={ShoppingBag}
                disabled={!product.inStock}
                onClick={() => {
                  addToCart(product)
                  setQuickViewOpen(false)
                }}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button href={`/products/${product._id}`} variant="secondary">View Details</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
