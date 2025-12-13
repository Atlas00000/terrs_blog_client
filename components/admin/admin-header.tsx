'use client'

import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AdminHeader() {
  const { user } = useAuth()

  return (
    <header className="h-16 border-b bg-background">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-bold text-xl">
            Terra Admin
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user?.name || user?.email}
          </span>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

