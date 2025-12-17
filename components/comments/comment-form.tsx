'use client'

import { useState } from 'react'
import { commentsApi } from '@/lib/api/comments'
import type { CommentCreateInput } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'

interface CommentFormProps {
  slug: string
  parentId?: string
  onSubmitted?: () => void
}

export function CommentForm({ slug, parentId, onSubmitted }: CommentFormProps) {
  const { user } = useAuth()
  const [form, setForm] = useState<CommentCreateInput>({
    content: '',
    parentId,
    authorName: user?.name || '',
    authorEmail: user?.email || '',
    authorUrl: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: keyof CommentCreateInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await commentsApi.create(slug, { ...form, parentId })
      setForm({
        content: '',
        parentId,
        authorName: user?.name || '',
        authorEmail: user?.email || '',
        authorUrl: '',
      })
      onSubmitted?.()
    } catch (err: any) {
      const message =
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to submit comment. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 dark:bg-destructive/20 rounded-md border border-destructive/20 dark:border-destructive/30">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Name *</label>
        <Input
          value={form.authorName}
          onChange={handleChange('authorName')}
          required
          disabled={isSubmitting}
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email *</label>
        <Input
          type="email"
          value={form.authorEmail}
          onChange={handleChange('authorEmail')}
          required
          disabled={!!user || isSubmitting}
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Website (optional)</label>
        <Input
          type="url"
          value={form.authorUrl}
          onChange={handleChange('authorUrl')}
          disabled={isSubmitting}
          placeholder="https://example.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Comment *</label>
        <Textarea
          value={form.content}
          onChange={handleChange('content')}
          required
          disabled={isSubmitting}
          placeholder="Share your thoughts..."
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Submitting...' : 'Post Comment'}
      </Button>
      <p className="text-xs text-muted-foreground">
        Comments are moderated. Your comment will appear once approved.
      </p>
    </form>
  )
}
