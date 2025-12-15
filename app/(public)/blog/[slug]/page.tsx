import { api } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CommentList } from '@/components/comments/comment-list'
import { CommentForm } from '@/components/comments/comment-form'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  readingTime: number | null
  publishedAt: string | null
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
    avatar: string | null
    slug: string | null
  }
  categories: Array<{ id: string; name: string; slug: string }>
  tags: Array<{ id: string; name: string; slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await api.get<{ data: Post }>(`/v1/posts/${slug}`)
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null
    }
    console.error('Failed to fetch post:', error)
    return null
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const cacheBustedCover =
    post.coverImage && process.env.NODE_ENV === 'development'
      ? `${post.coverImage}${post.coverImage.includes('?') ? '&' : '?'}cb=${Date.now()}`
      : post.coverImage

  return (
    <article className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {post.author.name && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <Link
                  href={post.author.slug ? `/authors/${post.author.slug}` : '#'}
                  className="hover:text-foreground transition-colors"
                >
                  {post.author.name}
                </Link>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {cacheBustedCover && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={cacheBustedCover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments */}
        <section className="mt-12 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Comments</h2>
            <p className="text-sm text-muted-foreground">
              Join the discussion. Comments are moderated.
            </p>
          </div>
          <CommentForm slug={post.slug} />
          <CommentList slug={post.slug} />
        </section>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t">
          <Button asChild variant="outline">
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
