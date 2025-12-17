'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PostSuggestion {
  id: string
  title: string
  slug: string
  excerpt: string | null
  readingTime: number | null
}

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<PostSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync with URL search param
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    setQuery(urlSearch)
  }, [searchParams])

  // Fetch suggestions as user types
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      const response = await api.get('/v1/posts', {
        params: {
          search: searchQuery.trim(),
          limit: 5,
          status: 'PUBLISHED',
        },
      })
      setSuggestions(response.data || [])
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
      setSuggestions([])
    }
  }, [])

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (query.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(query)
      }, 300) // 300ms debounce
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query, fetchSuggestions])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()
    
    setShowSuggestions(false)
    setIsSearching(true)
    try {
      if (trimmedQuery) {
        router.push(`/?search=${encodeURIComponent(trimmedQuery)}`)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }, [query, router])

  const handleSuggestionClick = (slug: string) => {
    setShowSuggestions(false)
    router.push(`/blog/${slug}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          e.preventDefault()
          handleSuggestionClick(suggestions[selectedIndex].slug)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
    }
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    router.push('/')
  }

  const suggestionsId = 'search-suggestions'
  const inputId = 'search-input'

  return (
    <div ref={containerRef} className="flex-1 max-w-2xl mx-4 relative">
      <form onSubmit={handleSearch} role="search" aria-label="Search posts">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" 
            aria-hidden="true"
          />
          <Input
            id={inputId}
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10"
            disabled={isSearching}
            aria-label="Search posts"
            aria-expanded={showSuggestions && suggestions.length > 0}
            aria-controls={showSuggestions && suggestions.length > 0 ? suggestionsId : undefined}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-describedby={isSearching ? 'search-status' : undefined}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Clear search"
              title="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        {isSearching && (
          <div id="search-status" className="sr-only" aria-live="polite" aria-atomic="true">
            Searching...
          </div>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          id={suggestionsId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full mt-2 w-full bg-background dark:bg-card border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg dark:shadow-2xl z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-2">
            <div className="text-xs font-semibold text-muted-foreground px-3 py-2" id="suggestions-label">
              Suggestions ({suggestions.length})
            </div>
            {suggestions.map((post, index) => (
              <button
                key={post.id}
                type="button"
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => handleSuggestionClick(post.slug)}
                title={`Read: ${post.title}`}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md hover:bg-accent dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  index === selectedIndex && 'bg-accent dark:bg-slate-800/50'
                )}
              >
                <div className="font-medium text-sm mb-1 line-clamp-1 text-foreground">{post.title}</div>
                {post.excerpt && (
                  <div className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {post.excerpt}
                  </div>
                )}
                {post.readingTime && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </button>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-accent dark:hover:bg-slate-800/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`View all results for ${query}`}
                title={`View all results for ${query}`}
              >
                View all results for &quot;{query}&quot;
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuggestions && suggestions.length === 0 && query.length >= 2 && (
        <div 
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          No suggestions found
        </div>
      )}
    </div>
  )
}

