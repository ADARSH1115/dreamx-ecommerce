'use client'
import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

const CART_STORAGE_KEY = 'dreamx_cart'

// Load cart from localStorage
function loadCartFromStorage() {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { items: Array.isArray(parsed.items) ? parsed.items : [] }
    }
  } catch (error) {
    console.error('Failed to load cart from storage:', error)
  }
  return { items: [] }
}

// Save cart to localStorage
function saveCartToStorage(state) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save cart to storage:', error)
  }
}

const cartReducer = (state, action) => {
  let newState

  switch (action.type) {
    case 'HYDRATE':
      return action.payload

    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id)
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        }
      }
      saveCartToStorage(newState)
      return newState
    
    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      }
      saveCartToStorage(newState)
      return newState
    
    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
      saveCartToStorage(newState)
      return newState
    
    case 'CLEAR_CART':
      newState = { ...state, items: [] }
      saveCartToStorage(newState)
      return newState
    
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    const stored = loadCartFromStorage()
    if (stored.items.length > 0) {
      dispatch({ type: 'HYDRATE', payload: stored })
    }
  }, [])

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    toast.success('Added to cart!')
    setIsDrawerOpen(true)
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
    toast.success('Removed from cart')
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      cart: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
