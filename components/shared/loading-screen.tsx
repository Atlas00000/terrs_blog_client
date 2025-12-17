'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export function LoadingScreen() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#0a0a0a]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary orb */}
        <div 
          className="absolute rounded-full opacity-20 blur-3xl animate-float animate-pulse-slow"
          style={{
            width: '600px',
            height: '600px',
            background: isDark 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            top: '20%',
            left: '10%',
          }}
        />
        
        {/* Secondary orb */}
        <div 
          className="absolute rounded-full opacity-15 blur-3xl animate-float-reverse"
          style={{
            width: '500px',
            height: '500px',
            background: isDark
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            bottom: '15%',
            right: '15%',
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const delay = Math.random() * 2
          const duration = 8 + Math.random() * 8
          const size = 4 + Math.random() * 6
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
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Brand logo */}
        <div className="relative">
          <Image
            src="https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev/2025/12/terra-logo-1766007088872-vqasieccsyq.png"
            alt="Terra Industries Logo"
            width={200}
            height={67}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
            className="h-16 sm:h-20 md:h-24 w-auto dark:invert animate-fade-in-out"
            priority
            quality={90}
          />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 dark:from-blue-400/30 dark:via-blue-500/30 dark:to-blue-400/30 blur-2xl -z-10 animate-pulse-slow" />
        </div>

        {/* Loading indicator */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div 
            className="absolute rounded-full border-2 border-transparent animate-spin-slow"
            style={{
              width: '80px',
              height: '80px',
              borderTopColor: isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
              borderRightColor: isDark ? 'rgba(99, 102, 241, 0.6)' : 'rgba(99, 102, 241, 0.4)',
            }}
          />
          
          {/* Middle ring */}
          <div 
            className="absolute rounded-full border-2 border-transparent animate-spin-reverse"
            style={{
              width: '60px',
              height: '60px',
              borderBottomColor: isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.4)',
              borderLeftColor: isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
            }}
          />

          {/* Inner core */}
          <div 
            className="absolute rounded-full animate-pulse-core"
            style={{
              width: '40px',
              height: '40px',
              background: isDark
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.2) 100%)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.1) 100%)',
              boxShadow: isDark
                ? '0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.3)'
                : '0 0 15px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2)',
            }}
          />
        </div>

        {/* Loading text */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium tracking-wide animate-fade-in-out">
          Loading...
        </p>
      </div>
    </div>
  )
}
