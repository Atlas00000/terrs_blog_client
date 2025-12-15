import { api } from '../api'
import type { Comment, PaginatedResponse, CommentCreateInput, AdminComment } from '../types'

export const commentsApi = {
  listForPost: (slug: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Comment>>(`/v1/posts/${slug}/comments`, { params }),

  create: (slug: string, data: CommentCreateInput) =>
    api.post<{ data: Comment }>(`/v1/posts/${slug}/comments`, data),

  // Admin
  adminList: (params?: {
    page?: number
    limit?: number
    status?: 'PENDING' | 'APPROVED' | 'REJECTED'
    postId?: string
    postSlug?: string
  }) => api.get<PaginatedResponse<AdminComment>>('/v1/comments', { params }),

  updateStatus: (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') =>
    api.patch<{ data: AdminComment }>(`/v1/comments/${id}/status`, { status }),

  delete: (id: string) => api.delete(`/v1/comments/${id}`),
}
