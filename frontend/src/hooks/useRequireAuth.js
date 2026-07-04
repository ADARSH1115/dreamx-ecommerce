'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

/**
 * Client-side route guard. Edge middleware can't see the JWT (it lives in
 * localStorage), so protected pages check auth state after mount instead.
 */
export function useRequireAuth({ role } = {}) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (role && user?.role !== role) {
      router.push('/')
    }
  }, [loading, isAuthenticated, user, role, router])

  return { user, loading, isAuthenticated }
}
