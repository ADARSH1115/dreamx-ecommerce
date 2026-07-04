'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Loader2,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'
import { API_URL } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/categories'
import { getRecentSearches, addRecentSearch } from '@/lib/recentSearches'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const searchRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()
  const { getCartCount, openDrawer } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const { wishlist } = useWishlist()

  useEffect(() => {
    setRecentSearches(getRecentSearches())
    const fetchPopular = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=4&sort=rating`)
        const data = await response.json()
        if (data.success) {
          setPopularProducts(data.data.products)
        }
      } catch (error) {
        console.error('Failed to fetch popular products:', error)
      }
    }
    fetchPopular()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setSearchLoading(true)
    const handle = setTimeout(async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?search=${encodeURIComponent(query)}&limit=5`)
        const data = await response.json()
        if (data.success) {
          setResults(data.data.products)
        }
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setSearchLoading(false)
      }
    }, 300)
    return () => clearTimeout(handle)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const runSearch = (term) => {
    if (!term.trim()) return
    addRecentSearch(term)
    setRecentSearches(getRecentSearches())
    router.push(`/products?search=${encodeURIComponent(term)}`)
    setIsSearchFocused(false)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    runSearch(query)
  }

  const isActive = (href) => pathname === href

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-md dark:bg-dark/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              DreamX
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-lg relative">
            <form onSubmit={submitSearch}>
              <div
                className={`relative flex items-center rounded-2xl border transition-all duration-200 ${
                  isSearchFocused
                    ? 'border-primary-500 shadow-glow'
                    : 'border-border hover:border-gray-300'
                }`}
              >
                <Search className="absolute left-4 text-muted" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products..."
                  className="w-full h-11 pl-11 pr-4 rounded-2xl bg-transparent outline-none text-sm"
                />
                {searchLoading && (
                  <Loader2 className="absolute right-4 animate-spin text-muted" size={16} />
                )}
              </div>
            </form>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute mt-2 w-full rounded-2xl border border-border bg-white shadow-lift overflow-hidden dark:bg-dark dark:border-white/10"
                >
                  {query.trim() ? (
                    results.length === 0 && !searchLoading ? (
                      <p className="p-4 text-sm text-muted">No products found for &ldquo;{query}&rdquo;</p>
                    ) : (
                      results.map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product._id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            {product.images?.[0]?.url && (
                              <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-muted">${product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      ))
                    )
                  ) : (
                    <div className="p-3">
                      {recentSearches.length > 0 && (
                        <div className="mb-3">
                          <p className="px-1 pb-2 text-xs font-semibold text-muted uppercase tracking-wide">
                            Recent Searches
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((term) => (
                              <button
                                key={term}
                                onClick={() => runSearch(term)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-xs hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                              >
                                <Clock size={12} /> {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {popularProducts.length > 0 && (
                        <div>
                          <p className="px-1 pb-2 text-xs font-semibold text-muted uppercase tracking-wide flex items-center gap-1">
                            <TrendingUp size={12} /> Popular Products
                          </p>
                          {popularProducts.map((product) => (
                            <Link
                              key={product._id}
                              href={`/products/${product._id}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                {product.images?.[0]?.url && (
                                  <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{product.name}</p>
                                <p className="text-xs text-muted">${product.price.toFixed(2)}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                      {recentSearches.length === 0 && popularProducts.length === 0 && (
                        <p className="p-2 text-sm text-muted">Start typing to search products...</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-dark dark:text-gray-100 hover:text-primary-600 transition-colors">
                Categories
                <ChevronDown size={14} className={`transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-[520px] rounded-2xl border border-border bg-white shadow-lift p-4 grid grid-cols-2 gap-1 dark:bg-dark dark:border-white/10"
                  >
                    {CATEGORIES.map(({ name, icon: Icon, description }) => (
                      <Link
                        key={name}
                        href={`/products?category=${encodeURIComponent(name)}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <span className="p-2 rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10">
                          <Icon size={18} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{name}</span>
                          <span className="block text-xs text-muted">{description}</span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'text-primary-600' : 'text-dark dark:text-gray-100 hover:text-primary-600'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-3 right-3 -bottom-px h-0.5 bg-primary-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Cart and User Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-dark dark:text-gray-100 hover:text-primary-600 transition-colors"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent-600 text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              onClick={(e) => {
                e.preventDefault()
                openDrawer()
              }}
              className="relative p-2 text-dark dark:text-gray-100 hover:text-primary-600 transition-colors"
            >
              <ShoppingBag size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <ThemeToggle className="hidden sm:inline-flex" />

            {isAuthenticated ? (
              <div className="relative group hidden sm:block">
                <button
                  aria-label="Account menu"
                  className="flex items-center gap-2 p-2 text-dark dark:text-gray-100 hover:text-primary-600 transition-colors"
                >
                  <User size={22} />
                </button>
                <div className="absolute right-0 mt-1 w-48 rounded-2xl border border-border bg-white shadow-lift py-1 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 dark:bg-dark dark:border-white/10">
                  <p className="px-4 py-2 text-xs text-muted truncate">Hi, {user?.name}</p>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="px-3 py-2 text-sm font-medium hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Button href="/register" size="sm">Sign Up</Button>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-dark dark:text-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border/60 dark:border-white/10"
            >
              <div className="py-4 flex flex-col gap-4">
                <form onSubmit={submitSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-11 pl-11 pr-4 rounded-2xl border border-border outline-none text-sm"
                  />
                </form>

                <Link href="/products" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  Products
                </Link>
                {CATEGORIES.slice(0, 4).map(({ name }) => (
                  <Link
                    key={name}
                    href={`/products?category=${encodeURIComponent(name)}`}
                    className="text-sm text-muted pl-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
                {NAV_LINKS.filter((l) => l.href !== '/products').map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <Link href="/wishlist" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  Wishlist
                </Link>

                <div className="flex items-center gap-2 text-sm font-medium">
                  <ThemeToggle className="p-0" />
                  Toggle theme
                </div>

                {isAuthenticated ? (
                  <button onClick={logout} className="text-left text-sm font-medium text-danger">
                    Logout
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Button href="/login" variant="secondary" size="sm" className="flex-1">Login</Button>
                    <Button href="/register" size="sm" className="flex-1">Sign Up</Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
