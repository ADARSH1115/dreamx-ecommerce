'use client'
import { useState } from 'react'
import { Mail, Gift, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { API_URL } from '@/lib/apiClient'
import Button from '@/components/ui/Button'

const BENEFITS = ['Weekly Deals', 'Exclusive Coupons', 'Early Access', 'Product Launches']

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
    try {
      const response = await fetch(`${API_URL}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setEmail('')
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 px-8 py-16 sm:px-16 text-center">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Gift className="text-white" size={40} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with DreamX
            </h2>

            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and get exclusive deals, early access to new products,
              and special promotions delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[52px] pl-11 pr-4 rounded-2xl border-0 outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                </div>
                <Button type="submit" loading={isLoading} variant="secondary" size="lg">
                  Subscribe
                </Button>
              </div>
            </form>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle2 size={16} className="text-white" />
                  {benefit}
                </div>
              ))}
            </div>

            <p className="text-blue-100/80 text-xs mt-8">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
