'use client'

import { useEffect, useState } from 'react'
import { commentsApi } from '@/lib/api/comments'
import type { AdminComment } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface CommentResponse {
  data: AdminComment[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function CommentsPage() {
  const { toast } = useToast()
  const [comments, setComments] = useState<AdminComment[]>([])
  const [pagination, setPagination] = useState<CommentResponse['pagination'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'>('ALL')
  const [page, setPage] = useState(1)

  const fetchComments = async () => {
    setLoading(true)
    try {
      const params: any = { page, limit: 20 }
      if (statusFilter !== 'ALL') {
        params.status = statusFilter
      }
      const res = await commentsApi.adminList(params)
      setComments(res.data)
      setPagination(res.pagination)
    } catch (error: any) {
      console.error('Failed to fetch comments:', error)
      toast({
        title: 'Failed to load comments',
        description: error?.response?.data?.error?.message || error?.message || 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, page])

  const handleStatusChange = async (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    try {
      await commentsApi.updateStatus(id, status)
      toast({ title: 'Comment updated', description: `Status set to ${status}` })
      fetchComments()
    } catch (error: any) {
      console.error('Failed to update status:', error)
      toast({
        title: 'Update failed',
        description: error?.response?.data?.error?.message || error?.message || 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await commentsApi.delete(id)
      toast({ title: 'Comment deleted' })
      fetchComments()
    } catch (error: any) {
      console.error('Failed to delete comment:', error)
      toast({
        title: 'Delete failed',
        description: error?.response?.data?.error?.message || error?.message || 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-muted-foreground">Moderate reader feedback</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => { setPage(1); setStatusFilter(v as any) }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No comments found.</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="align-top">
                    <div className="font-medium">{comment.authorName}</div>
                    {comment.authorUrl && (
                      <div className="text-xs text-primary break-all">{comment.authorUrl}</div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="align-top max-w-md">
                    <div className="text-sm whitespace-pre-wrap line-clamp-4">{comment.content}</div>
                  </TableCell>
                  <TableCell className="align-top">
                    {comment.post ? (
                      <div>
                        <div className="font-medium text-sm">{comment.post.title}</div>
                        <div className="text-xs text-muted-foreground">/{comment.post.slug}</div>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">-</div>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        comment.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                          : comment.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}
                    >
                      {comment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right align-top space-y-2">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(comment.id, 'APPROVED')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(comment.id, 'REJECTED')}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
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
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
