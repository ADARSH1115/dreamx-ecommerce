'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { API_URL } from '@/lib/apiClient'
import { useAuth } from '@/context/AuthContext'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)

  const authHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([])
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/users/wishlist`, {
        headers: authHeaders(),
      })
      const data = await response.json()
      if (data.success) {
        setWishlist(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!authLoading) {
      fetchWishlist()
    }
  }, [authLoading, fetchWishlist])

  const isWishlisted = (productId) => wishlist.some((p) => p._id === productId)

  const toggleWishlist = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to use your wishlist')
      return
    }

    const alreadyIn = isWishlisted(product._id)

    // Optimistic update
    setWishlist((prev) =>
      alreadyIn ? prev.filter((p) => p._id !== product._id) : [...prev, product]
    )

    try {
      const response = await fetch(`${API_URL}/api/users/wishlist/${product._id}`, {
        method: alreadyIn ? 'DELETE' : 'POST',
        headers: authHeaders(),
      })
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }
      toast.success(alreadyIn ? 'Removed from wishlist' : 'Added to wishlist')
    } catch (error) {
      // Revert on failure
      setWishlist((prev) =>
        alreadyIn ? [...prev, product] : prev.filter((p) => p._id !== product._id)
      )
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, loading, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
