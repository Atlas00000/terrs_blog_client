'use client'

import { Suspense } from 'react'
import { SearchBar } from './search-bar'

function SearchBarFallback() {
  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="relative">
        <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          <span className="text-muted-foreground">Search posts...</span>
        </div>
      </div>
    </div>
  )
}

export function SearchBarWrapper() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <SearchBar />
    </Suspense>
  )
}
