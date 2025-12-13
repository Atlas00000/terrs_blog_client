'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postsApi, categoriesApi, tagsApi } from '@/lib/api/admin'
import type { Post, Category, Tag, PostStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
})

type PostFormData = z.infer<typeof postSchema>

interface PostFormProps {
  postId?: string
}

export function PostForm({ postId }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(!!postId)
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      status: 'DRAFT',
      categoryIds: [],
      tagIds: [],
    },
  })

  const status = watch('status')

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, tagsRes] = await Promise.all([
          categoriesApi.getAll({ limit: 100 }),
          tagsApi.getAll({ limit: 100 }),
        ])
        setCategories(catsRes.data)
        setTags(tagsRes.data)

        if (postId) {
          const post = await postsApi.getById(postId)
          const postData = post.data
          setValue('title', postData.title)
          setValue('slug', postData.slug)
          setValue('excerpt', postData.excerpt || '')
          setValue('content', postData.content)
          setValue('coverImage', postData.coverImage || '')
          setValue('status', postData.status)
          setSelectedCategories(postData.categories.map((c) => c.id))
          setSelectedTags(postData.tags.map((t) => t.id))
          setValue('categoryIds', postData.categories.map((c) => c.id))
          setValue('tagIds', postData.tags.map((t) => t.id))
          setFetching(false)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setFetching(false)
      }
    }

    fetchData()
  }, [postId, setValue])

  const onSubmit = async (data: PostFormData) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        categoryIds: selectedCategories,
        tagIds: selectedTags,
      }

      if (postId) {
        await postsApi.update(postId, payload)
      } else {
        await postsApi.create(payload)
      }
      router.push('/admin/posts')
    } catch (error: any) {
      console.error('Failed to save post:', error)
      alert(error.response?.data?.error?.message || 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    if (!postId) {
      setValue('slug', generateSlug(title))
    }
  }

  if (fetching) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {postId ? 'Edit Post' : 'New Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                onChange={handleTitleChange}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="post-url-slug"
              />
              {errors.slug && (
                <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                {...register('excerpt')}
                placeholder="Brief description of the post"
                maxLength={500}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                {...register('coverImage')}
                placeholder="https://example.com/image.jpg"
              />
              {errors.coverImage && (
                <p className="text-sm text-destructive mt-1">{errors.coverImage.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setValue('status', value as PostStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content *</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="content">Post Content</Label>
              <textarea
                id="content"
                {...register('content')}
                className="w-full min-h-[400px] p-3 border rounded-md font-mono text-sm"
                placeholder="Enter post content (HTML or Markdown)"
              />
              {errors.content && (
                <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories & Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Categories</Label>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category.id])
                        } else {
                          setSelectedCategories(selectedCategories.filter((id) => id !== category.id))
                        }
                      }}
                      className="rounded"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag.id])
                        } else {
                          setSelectedTags(selectedTags.filter((id) => id !== tag.id))
                        }
                      }}
                      className="rounded"
                    />
                    <span>{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/posts">Cancel</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}

