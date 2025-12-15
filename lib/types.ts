// Shared types for admin panel

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED'
export type UserRole = 'ADMIN' | 'EDITOR' | 'AUTHOR'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  status: PostStatus
  readingTime: number | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string | null
    email: string
  }
  categories: Array<{ id: string; name: string; slug: string }>
  tags: Array<{ id: string; name: string; slug: string }>
}

export interface PostCreateInput {
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  status?: PostStatus
  categoryIds?: string[]
  tagIds?: string[]
}

export interface PostUpdateInput {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  coverImage?: string
  status?: PostStatus
  categoryIds?: string[]
  tagIds?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  bio: string | null
  avatar: string | null
  slug: string | null
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl: string | null
  uploadedBy: {
    id: string
    name: string | null
    email: string
  }
  createdAt: string
}

export interface Comment {
  id: string
  content: string
  authorName: string
  authorUrl?: string | null
  parentId?: string | null
  createdAt: string
}

export interface AdminComment extends Comment {
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  post?: {
    id: string
    title: string
    slug: string
  }
}

export interface CommentCreateInput {
  content: string
  parentId?: string
  authorName: string
  authorEmail: string
  authorUrl?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

