'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { SearchBarWrapper } from './search-bar-wrapper'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center px-4">
        {/* Left: Brand (sticks to far left) */}
        <div className="flex-1 flex items-center">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="font-bold text-xl">Terra Industries</span>
          </Link>
        </div>

        {/* Center: Search (max width, centered) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBarWrapper />
          </div>
        </div>

        {/* Right: Theme toggle (sticks to far right) */}
        <div className="flex-1 flex items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
