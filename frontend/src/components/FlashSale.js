'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, Clock } from 'lucide-react'
import { API_URL } from '@/lib/apiClient'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'

// No "sale start" date is stored on a product, only saleEndDate. To render
// a progress bar without inventing stock numbers, we assume a fixed
// typical sale window and derive progress from time elapsed within it.
const ASSUMED_SALE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!targetDate) return
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-white/10 rounded-xl px-3 py-2 min-w-[56px]">
      <span className="text-xl font-bold text-white tabular-nums">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] text-white/70 uppercase tracking-wide">{label}</span>
    </div>
  )
}

export default function FlashSale() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/flash-sale?limit=4`)
        const data = await response.json()
        if (data.success) {
          setDeals(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch flash sale products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDeals()
  }, [])

  const soonestEndDate = deals.reduce((soonest, deal) => {
    const end = new Date(deal.saleEndDate)
    return !soonest || end < soonest ? end : soonest
  }, null)

  const timeLeft = useCountdown(soonestEndDate)

  if (!loading && deals.length === 0) return null

  return (
    <section className="py-24 sm:py-28 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-danger/20">
              <Zap className="text-danger" size={24} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Flash Sale</h2>
              <p className="text-gray-400 text-sm">Deals this good don&apos;t last long</p>
            </div>
          </div>

          {timeLeft && (
            <div className="flex items-center gap-2">
              <Clock className="text-white/60 mr-1" size={18} />
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <TimeUnit value={timeLeft.minutes} label="Min" />
              <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => {
            const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100)
            const elapsed = ASSUMED_SALE_WINDOW_MS - (new Date(product.saleEndDate).getTime() - Date.now())
            const progress = Math.min(100, Math.max(0, (elapsed / ASSUMED_SALE_WINDOW_MS) * 100))

            return (
              <div key={product._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Link href={`/products/${product._id}`} className="block relative aspect-square rounded-2xl overflow-hidden mb-3">
                  {product.images?.[0]?.url && (
                    <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                  )}
                  {discountPercent > 0 && (
                    <span className="absolute top-2 left-2 bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{discountPercent}%
                    </span>
                  )}
                </Link>
                <h3 className="text-white font-medium truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                </div>

                <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-danger to-accent-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <Button size="sm" className="w-full mt-3" onClick={() => addToCart(product)} disabled={!product.inStock}>
                  {product.inStock ? 'Grab Deal' : 'Sold Out'}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
