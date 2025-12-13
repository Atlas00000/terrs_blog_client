'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/lib/api'

interface User {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'EDITOR' | 'AUTHOR'
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        setToken(storedToken)
        // Verify token and get user
        fetchUser(storedToken)
      } else {
        setIsLoading(false)
      }
    }
  }, [])

  const fetchUser = async (authToken: string) => {
    try {
      const response = await api.get('/v1/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      setUser(response.data)
    } catch (error) {
      // Token invalid, clear it
      localStorage.removeItem('auth_token')
      setToken(null)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/v1/auth/login', { email, password })
      const { token: authToken, user: userData } = response.data
      
      localStorage.setItem('auth_token', authToken)
      setToken(authToken)
      setUser(userData)
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
