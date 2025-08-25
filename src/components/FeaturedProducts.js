'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

// Sample products data - In production, this would come from API
const sampleProducts = [
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.8,
    reviews: 124,
    category: 'Electronics',
    inStock: true,
  },
  {
    _id: '2',
    name: 'Stylish Leather Jacket',
    price: 189.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    rating: 4.6,
    reviews: 89,
    category: 'Fashion',
    inStock: true,
  },
  {
    _id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.7,
    reviews: 156,
    category: 'Accessories',
    inStock: true,
  },
  {
    _id: '4',
    name: 'Modern Table Lamp',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    rating: 4.5,
    reviews: 67,
    category: 'Home & Garden',
    inStock: true,
  },
  {
    _id: '5',
    name: 'Professional Camera',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
    rating: 4.9,
    reviews: 203,
    category: 'Electronics',
    inStock: false,
  },
  {
    _id: '6',
    name: 'Organic Skincare Set',
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    rating: 4.4,
    reviews: 98,
    category: 'Health & Beauty',
    inStock: true,
  }
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=6')
      const data = await response.json()
      if (data.success) {
        setProducts(data.data.products)
      } else {
        // Fallback to sample data if API fails
        setProducts(sampleProducts)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      // Fallback to sample data
      setProducts(sampleProducts)
    }
  }

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAddToCart = (product) => {
    if (!product.inStock) return
    addToCart(product)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with exclusive deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <FiHeart 
                    className={`${wishlist.includes(product._id) ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                    size={20}
                  />
                </button>
                
                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-primary-600 text-sm font-medium">{product.category}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiShoppingCart size={20} />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/products"
            className="btn-primary inline-flex items-center"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}
