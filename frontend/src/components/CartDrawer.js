'use client'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity, getCartTotal } = useCart()

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/50"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 right-0 z-[120] h-full w-full max-w-md bg-white dark:bg-dark shadow-lift flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/60 dark:border-white/10">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button onClick={closeDrawer} aria-label="Close cart" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="text-muted mb-4" size={40} />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm text-muted mt-1">Add products to get started.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item._id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 dark:bg-white/5 shrink-0">
                        {item.images?.[0]?.url && (
                          <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-sm text-muted">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1 rounded-md border border-border hover:bg-gray-50 dark:hover:bg-white/10"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-1 rounded-md border border-border hover:bg-gray-50 dark:hover:bg-white/10"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-muted hover:text-danger"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border/60 dark:border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
                </div>
                <Button href="/cart" className="w-full" onClick={closeDrawer}>
                  View Cart & Checkout
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
