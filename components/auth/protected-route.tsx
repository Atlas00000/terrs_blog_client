'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'ADMIN' | 'EDITOR' | 'AUTHOR'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/admin/login')
        return
      }

      if (requiredRole) {
        const roleHierarchy = { ADMIN: 3, EDITOR: 2, AUTHOR: 1 }
        const userRoleLevel = roleHierarchy[user?.role || 'AUTHOR']
        const requiredRoleLevel = roleHierarchy[requiredRole]

        if (userRoleLevel < requiredRoleLevel) {
          router.push('/admin')
          return
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
