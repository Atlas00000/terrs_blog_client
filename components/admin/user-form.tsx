'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usersApi } from '@/lib/api/admin'
import type { User, UserRole } from '@/lib/types'
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

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  name: z.string().optional(),
  role: z.enum(['ADMIN', 'EDITOR', 'AUTHOR']),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormProps {
  user?: User
  onSuccess: () => void
  onCancel: () => void
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user?.email || '',
      name: user?.name || '',
      role: user?.role || 'AUTHOR',
      password: '',
    },
  })

  const role = watch('role')

  const onSubmit = async (data: UserFormData) => {
    setLoading(true)
    try {
      if (user) {
        const updateData: any = {
          // Note: Email cannot be updated via this endpoint (backend schema omits it)
          name: data.name || undefined,
          role: data.role,
        }
        // Remove empty strings to send undefined instead
        if (updateData.name === '') {
          updateData.name = undefined
        }
        console.log('Updating user:', user.id, updateData)
        await usersApi.update(user.id, updateData)
      } else {
        if (!data.password) {
          alert('Password is required for new users')
          return
        }
        await usersApi.create({
          email: data.email,
          password: data.password,
          name: data.name,
          role: data.role,
        })
      }
      onSuccess()
    } catch (error: any) {
      console.error('Failed to save user:', error)
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save user'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Full name"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Role *</Label>
        <Select
          value={role}
          onValueChange={(value) => setValue('role', value as UserRole)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AUTHOR">Author</SelectItem>
            <SelectItem value="EDITOR">Editor</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!user && (
        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Minimum 6 characters"
          />
          {errors.password && (
            <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
          )}
        </div>
      )}

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  )
}

