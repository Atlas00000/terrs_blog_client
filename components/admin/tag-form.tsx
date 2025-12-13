'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { tagsApi } from '@/lib/api/admin'
import type { Tag } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const tagSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional(),
})

type TagFormData = z.infer<typeof tagSchema>

interface TagFormProps {
  tag?: Tag
  onSuccess: () => void
  onCancel: () => void
}

export function TagForm({ tag, onSuccess, onCancel }: TagFormProps) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: tag?.name || '',
      slug: tag?.slug || '',
      description: tag?.description || '',
    },
  })

  const name = watch('name')

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setValue('name', newName)
    if (!tag) {
      setValue('slug', generateSlug(newName))
    }
  }

  const onSubmit = async (data: TagFormData) => {
    setLoading(true)
    try {
      if (tag) {
        await tagsApi.update(tag.id, data)
      } else {
        await tagsApi.create(data)
      }
      onSuccess()
    } catch (error: any) {
      console.error('Failed to save tag:', error)
      alert(error.response?.data?.error?.message || 'Failed to save tag')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register('name')}
          onChange={handleNameChange}
          placeholder="Tag name"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          {...register('slug')}
          placeholder="tag-slug"
        />
        {errors.slug && (
          <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register('description')}
          placeholder="Tag description"
        />
        {errors.description && (
          <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : tag ? 'Update Tag' : 'Create Tag'}
        </Button>
      </div>
    </form>
  )
}

