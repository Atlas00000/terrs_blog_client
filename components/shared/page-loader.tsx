'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LoadingScreen } from './loading-screen'

export function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    // Show loading screen on initial mount
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Minimum display time for smooth UX

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Show loading when pathname changes (navigation)
    setIsNavigating(true)
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  if (loading || isNavigating) {
    return <LoadingScreen />
  }

  return null
}
