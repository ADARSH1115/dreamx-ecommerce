'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    setIsLoading(true)
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout functionality would be implemented here with Stripe!')
      setIsLoading(false)
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link href="/products" className="flex items-center text-primary-600 hover:text-primary-700">
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item._id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>🔒</span>
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
