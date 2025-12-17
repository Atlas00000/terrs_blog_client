'use client'

import { useEffect, useState } from 'react'
import { LoadingScreen } from './loading-screen'

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading screen on initial page load for all pages
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show for 2 seconds for aesthetic purposes

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return <>{children}</>
}
