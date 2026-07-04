'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('dreamx_theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 text-dark dark:text-gray-100 hover:text-primary-600 transition-colors ${className}`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
