import { api } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CommentsSection } from '@/components/comments/comments-section'

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

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

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
    <article className="flex justify-center">
      <div className="w-full max-w-4xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {post.categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">{post.title}</h1>
          {post.excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
            {post.author.name && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 dark:text-slate-500" />
                <Link
                  href={post.author.slug ? `/authors/${post.author.slug}` : '#'}
                  className="hover:text-foreground transition-colors"
                >
                  {post.author.name}
                </Link>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 dark:text-slate-500" />
                <span>{formattedDate}</span>
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 dark:text-slate-500" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {cacheBustedCover && (
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full mb-6 sm:mb-8 rounded-lg overflow-hidden">
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
          className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none mb-8 sm:mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments */}
        <section className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Comments</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Join the discussion. Comments are moderated.
            </p>
          </div>
          <CommentsSection slug={post.slug} />
        </section>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-muted dark:bg-slate-800/50 text-muted-foreground rounded-full hover:bg-muted/80 dark:hover:bg-slate-800/70 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
          <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
            <Link href="/">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
