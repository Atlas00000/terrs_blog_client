'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#0a0a0a]">
      {/* Animated gradient orbs that follow mouse */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary orb - follows mouse */}
        <div 
          className="absolute rounded-full opacity-20 blur-3xl transition-all duration-1000 ease-out"
          style={{
            width: '500px',
            height: '500px',
            background: isDark 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            left: `${mousePosition.x - 25}%`,
            top: `${mousePosition.y - 25}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Secondary orb */}
        <div 
          className="absolute rounded-full opacity-15 blur-3xl animate-float-reverse"
          style={{
            width: '600px',
            height: '600px',
            background: isDark
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
          }}
        />

        {/* Tertiary orb */}
        <div 
          className="absolute rounded-full opacity-10 blur-3xl animate-float-center"
          style={{
            width: '400px',
            height: '400px',
            background: isDark
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            top: '20%',
            left: '15%',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const delay = Math.random() * 2
          const duration = 8 + Math.random() * 8
          const size = 3 + Math.random() * 5
          const left = Math.random() * 100
          const top = Math.random() * 100
          
          return (
            <div
              key={i}
              className="absolute rounded-full animate-float-particle"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: isDark
                  ? 'rgba(59, 130, 246, 0.4)'
                  : 'rgba(59, 130, 246, 0.3)',
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                boxShadow: isDark
                  ? '0 0 10px rgba(59, 130, 246, 0.5)'
                  : '0 0 8px rgba(59, 130, 246, 0.4)',
              }}
            />
          )
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center">
        {/* Large 404 with gradient */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold leading-none">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent animate-gradient-shift">
              404
            </span>
          </h1>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 dark:from-blue-400/30 dark:via-blue-500/30 dark:to-blue-400/30 blur-3xl -z-10 animate-pulse-slow" />
        </div>

        {/* Animated decorative rings */}
        <div className="relative flex items-center justify-center -mt-8">
          {/* Outer ring */}
          <div 
            className="absolute rounded-full border-2 border-transparent animate-spin-slow"
            style={{
              width: '200px',
              height: '200px',
              borderTopColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
              borderRightColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)',
            }}
          />
          
          {/* Middle ring */}
          <div 
            className="absolute rounded-full border-2 border-transparent animate-spin-reverse"
            style={{
              width: '150px',
              height: '150px',
              borderBottomColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
              borderLeftColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
            }}
          />

          {/* Inner core */}
          <div 
            className="absolute rounded-full animate-pulse-core"
            style={{
              width: '100px',
              height: '100px',
              background: isDark
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 100%)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.05) 100%)',
              boxShadow: isDark
                ? '0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 30px rgba(59, 130, 246, 0.2)'
                : '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
            }}
          />
        </div>

        {/* Error message */}
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            The page you&apos;re looking for has drifted off into the void. 
            <br className="hidden sm:block" />
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            asChild 
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="group border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium transition-all duration-200"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Browse Blog</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            size="lg"
            onClick={() => window.history.back()}
            className="group text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
