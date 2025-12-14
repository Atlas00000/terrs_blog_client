import { api } from '../api'
import type {
  Post,
  PostCreateInput,
  PostUpdateInput,
  Category,
  Tag,
  User,
  Media,
  PaginatedResponse,
  UserRole,
} from '../types'

// Posts API
export const postsApi = {
  getAll: (params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }) => api.get<PaginatedResponse<Post>>('/v1/posts', { params }),
  
  getById: (id: string) => api.get<{ data: Post }>(`/v1/posts/id/${id}`),
  
  getBySlug: (slug: string) => api.get<{ data: Post }>(`/v1/posts/${slug}`),
  
  create: (data: PostCreateInput) => api.post<{ data: Post }>('/v1/posts', data),
  
  update: (id: string, data: PostUpdateInput) =>
    api.put<{ data: Post }>(`/v1/posts/${id}`, data),
  
  delete: (id: string) => api.delete(`/v1/posts/${id}`),
}

// Categories API
export const categoriesApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<PaginatedResponse<Category>>('/v1/categories', { params }),
  
  getById: (id: string) => api.get<{ data: Category }>(`/v1/categories/id/${id}`),
  
  create: (data: { name: string; slug: string; description?: string }) =>
    api.post<{ data: Category }>('/v1/categories', data),
  
  update: (id: string, data: { name?: string; slug?: string; description?: string }) =>
    api.put<{ data: Category }>(`/v1/categories/${id}`, data),
  
  delete: (id: string) => api.delete(`/v1/categories/${id}`),
}

// Tags API
export const tagsApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<PaginatedResponse<Tag>>('/v1/tags', { params }),
  
  getById: (id: string) => api.get<{ data: Tag }>(`/v1/tags/id/${id}`),
  
  create: (data: { name: string; slug: string; description?: string }) =>
    api.post<{ data: Tag }>('/v1/tags', data),
  
  update: (id: string, data: { name?: string; slug?: string; description?: string }) =>
    api.put<{ data: Tag }>(`/v1/tags/${id}`, data),
  
  delete: (id: string) => api.delete(`/v1/tags/${id}`),
}

// Users API
export const usersApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<PaginatedResponse<User>>('/v1/users', { params }),
  
  getById: (id: string) => api.get<{ data: User }>(`/v1/users/${id}`),
  
  create: (data: {
    email: string
    password: string
    name?: string
    role?: UserRole
  }) => api.post<{ data: User }>('/v1/users', data),
  
  update: (id: string, data: {
    email?: string
    name?: string
    role?: UserRole
    bio?: string
    avatar?: string
  }) => api.put<{ data: User }>(`/v1/users/${id}`, data),
  
  delete: (id: string) => api.delete(`/v1/users/${id}`),
}

// Helper to transform backend media response to frontend Media type
const transformMedia = (item: any): Media => ({
  ...item,
  originalName: item.originalName || item.fileName || '',
  url: item.originalUrl || item.url || '',
  size: item.fileSize || item.size || 0,
})

// Media API
export const mediaApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get<PaginatedResponse<any>>('/v1/media', { params })
    return {
      ...response,
      data: response.data.map(transformMedia),
    }
  },
  
  getById: async (id: string) => {
    const response = await api.get<{ data: any }>(`/v1/media/${id}`)
    return {
      data: transformMedia(response.data),
    }
  },
  
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post<{ data: any }>('/v1/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return {
      data: transformMedia(response.data),
    }
  },
  
  uploadMultiple: async (files: File[]) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    const response = await api.post<{ data: { uploads: any[]; failed: any[]; total: number; successful: number; failedCount: number } }>('/v1/media/upload-multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return {
      data: {
        ...response.data,
        uploads: response.data.uploads?.map(transformMedia) || [],
      },
    }
  },
  
  delete: (id: string) => api.delete(`/v1/media/${id}`),
}

