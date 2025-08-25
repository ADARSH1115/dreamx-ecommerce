'use client'
import { useState } from 'react'
import { FiMail, FiGift } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Successfully subscribed to newsletter!')
      setEmail('')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div>
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <FiGift className="text-white" size={48} />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with DreamX
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive deals, early access to new products, 
              and special promotions delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-white focus:border-white outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">10%</div>
                <div className="text-blue-100">Welcome Discount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Weekly</div>
                <div className="text-blue-100">New Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Early</div>
                <div className="text-blue-100">Access</div>
              </div>
            </div>

            <p className="text-blue-100 text-sm mt-6">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
