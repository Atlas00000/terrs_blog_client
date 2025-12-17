'use client'

import { useEffect, useState } from 'react'
import { commentsApi } from '@/lib/api/comments'
import type { Comment, PaginatedResponse } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface CommentListProps {
  slug: string
}

export function CommentList({ slug }: CommentListProps) {
  const [data, setData] = useState<PaginatedResponse<Comment> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const fetchComments = async (pageNum: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await commentsApi.listForPost(slug, { page: pageNum, limit: 10 })
      setData(res)
    } catch (err: any) {
      const message =
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to load comments.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slug])

  if (loading && !data) {
    return (
      <div className="text-sm text-muted-foreground">Loading comments...</div>
    )
  }

  if (error) {
    return (
      <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
        {error}
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No comments yet.</div>
    )
  }

  const { pagination } = data

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {data.data.map((comment) => (
          <div key={comment.id} className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-2 bg-card dark:bg-card">
            <div className="text-sm font-semibold text-foreground">{comment.authorName}</div>
            {comment.authorUrl && (
              <a
                href={comment.authorUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary hover:underline"
              >
                {comment.authorUrl}
              </a>
            )}
            <div className="text-sm text-muted-foreground">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
            <div className="text-sm whitespace-pre-wrap text-foreground">{comment.content}</div>
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            className="border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
