'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun, Search, Monitor } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { SearchBarWrapper } from './search-bar-wrapper'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the icon for the current theme
  const getThemeIcon = () => {
    if (!mounted) return <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
    if (theme === 'system') return <Monitor className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
    if (theme === 'dark' || resolvedTheme === 'dark') return <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
    return <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
  }

  const getMobileThemeIcon = () => {
    if (!mounted) return <Sun className="h-5 w-5" aria-hidden="true" />
    if (theme === 'system') return <Monitor className="h-5 w-5" aria-hidden="true" />
    if (theme === 'dark' || resolvedTheme === 'dark') return <Moon className="h-5 w-5" aria-hidden="true" />
    return <Sun className="h-5 w-5" aria-hidden="true" />
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        title="Skip to main content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      {/* Desktop Header */}
      <nav className="hidden md:flex h-16 w-full items-center px-4" aria-label="Main navigation">
        {/* Left: Brand (sticks to far left) */}
        <div className="flex-1 flex items-center">
              <Link
                href="/"
            className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
            aria-label="Terra Industries - Go to homepage"
            title="Go to homepage"
              >
                <Image
                  src="https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev/2025/12/terra-logo-1766007088872-vqasieccsyq.png"
                  alt="Terra Industries Logo"
                  width={120}
                  height={40}
                  sizes="(max-width: 768px) 100px, 120px"
                  className="h-8 w-auto dark:invert"
                  priority
                  quality={90}
                />
              </Link>
        </div>

        {/* Center: Search (max width, centered) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBarWrapper />
          </div>
        </div>

        {/* Right: Theme selector (sticks to far right) */}
        <div className="flex-1 flex items-center justify-end">
                <Select
                  value={mounted ? theme || 'light' : 'light'}
                  onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                >
            <SelectTrigger 
              className="w-10 h-9 p-0 flex items-center justify-center border-0 bg-transparent hover:bg-accent shadow-none [&>svg:last-child]:hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Change theme. Current theme: ${mounted ? (theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light') : 'Light'}`}
              title={`Change theme (Current: ${mounted ? (theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light') : 'Light'})`}
            >
                    {getThemeIcon()}
                  </SelectTrigger>
                  <SelectContent className="min-w-[3rem] w-auto">
                    <SelectItem value="light" className="flex items-center justify-center">
                <Sun className="h-4 w-4" aria-hidden="true" />
                    </SelectItem>
                    <SelectItem value="dark" className="flex items-center justify-center">
                <Moon className="h-4 w-4" aria-hidden="true" />
                    </SelectItem>
                    <SelectItem value="system" className="flex items-center justify-center">
                <Monitor className="h-4 w-4" aria-hidden="true" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden" aria-label="Main navigation">
        {/* Top Row: Brand, Search Icon, Theme Toggle */}
        <div className="flex h-14 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
            onClick={() => setShowMobileSearch(false)}
            aria-label="Terra Industries - Go to homepage"
            title="Go to homepage"
          >
            <Image
              src="https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev/2025/12/terra-logo-1766007088872-vqasieccsyq.png"
              alt="Terra Industries Logo"
              width={100}
              height={33}
              sizes="100px"
              className="h-7 w-auto dark:invert"
              priority
              quality={90}
            />
          </Link>
          
          <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowMobileSearch(!showMobileSearch)
                  }}
              aria-label={showMobileSearch ? 'Close search' : 'Open search'}
              aria-expanded={showMobileSearch}
              title={showMobileSearch ? 'Close search' : 'Open search'}
              className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
              <Search className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{showMobileSearch ? 'Close search' : 'Search posts'}</span>
                </Button>
                  <Select
                    value={mounted ? theme || 'light' : 'light'}
                    onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                  >
              <SelectTrigger 
                className="w-10 h-9 p-0 flex items-center justify-center border-0 bg-transparent hover:bg-accent shadow-none [&>svg:last-child]:hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Change theme. Current theme: ${mounted ? (theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light') : 'Light'}`}
                title={`Change theme (Current: ${mounted ? (theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light') : 'Light'})`}
              >
                      {getMobileThemeIcon()}
                    </SelectTrigger>
                    <SelectContent className="min-w-[3rem] w-auto">
                      <SelectItem value="light" className="flex items-center justify-center">
                  <Sun className="h-4 w-4" aria-hidden="true" />
                      </SelectItem>
                      <SelectItem value="dark" className="flex items-center justify-center">
                  <Moon className="h-4 w-4" aria-hidden="true" />
                      </SelectItem>
                      <SelectItem value="system" className="flex items-center justify-center">
                  <Monitor className="h-4 w-4" aria-hidden="true" />
                      </SelectItem>
                    </SelectContent>
                  </Select>
          </div>
        </div>

        {/* Mobile Search Bar (expandable) */}
        {showMobileSearch && (
          <div className="px-4 pb-3 border-b" role="region" aria-label="Search">
            <SearchBarWrapper />
          </div>
        )}
      </nav>
    </header>
  )
}
