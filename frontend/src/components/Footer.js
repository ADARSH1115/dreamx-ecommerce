'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { API_URL } from '@/lib/apiClient'
import Button from '@/components/ui/Button'

const QUICK_LINKS = [
  { href: '/products', label: 'All Products' },
  { href: '/products', label: 'Categories' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/compare', label: 'Compare' },
]

const SUPPORT_LINKS = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/about', label: 'About Us' },
]

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
const PAYMENT_METHODS = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay']
const SOCIALS = [
  { icon: FaFacebookF, label: 'Facebook' },
  { icon: FaTwitter, label: 'Twitter' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaLinkedinIn, label: 'LinkedIn' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
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
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">DreamX</h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted partner for premium quality products at unbeatable prices.
              Shop with confidence and experience the difference.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Support</h4>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="text-primary-400 shrink-0 mt-0.5" size={16} />
                <span>Srinivasa Nagar, Boduppal, Hyderabad, Telangana 500039</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-primary-400 shrink-0" size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-primary-400 shrink-0" size={16} />
                <span>support@dreamx.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Get deals straight to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary-500"
                required
              />
              <Button type="submit" size="sm" loading={isLoading}>Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {PAYMENT_METHODS.map((method) => (
              <span key={method} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-400">
                {method}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DreamX. All rights reserved.
            </p>
            <div className="flex gap-6">
              {LEGAL_LINKS.map((label) => (
                <a key={label} href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
