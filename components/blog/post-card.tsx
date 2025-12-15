import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, User } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  readingTime: number | null
  publishedAt: string | null
  author: {
    name: string | null
  }
  categories: Array<{ name: string; slug: string }>
}

export function PostCard({ post }: { post: Post }) {
  const cacheBustedImage =
    post.coverImage && process.env.NODE_ENV === 'development'
      ? `${post.coverImage}${post.coverImage.includes('?') ? '&' : '?'}cb=${Date.now()}`
      : post.coverImage

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        {cacheBustedImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={cacheBustedImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category.slug}
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          {post.excerpt && (
            <CardDescription className="line-clamp-3">
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {post.author.name && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
          {formattedDate && <span>{formattedDate}</span>}
        </CardFooter>
      </Link>
    </Card>
  )
}
