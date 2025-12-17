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

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
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

  const dateTimeValue = post.publishedAt ? new Date(post.publishedAt).toISOString() : null

  // Create accessible label for the card link
  const cardLabel = [
    post.title,
    post.excerpt ? `Excerpt: ${post.excerpt}` : null,
    post.author.name ? `By ${post.author.name}` : null,
    formattedDate ? `Published ${formattedDate}` : null,
    post.readingTime ? `${post.readingTime} minute read` : null,
  ]
    .filter(Boolean)
    .join('. ')

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900 ${
      featured 
        ? 'lg:shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl border-2 border-slate-200/90 dark:border-slate-700/60 bg-gradient-to-br from-white via-blue-50/20 to-slate-50/30 dark:from-[#0f0f0f] dark:via-[#0d0d0d] dark:to-[#0a0a0a]' 
        : 'shadow-sm dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white to-slate-50/50 dark:from-[#0f0f0f] dark:to-[#0a0a0a]'
      }`}
    >
      <article>
        <Link 
          href={`/blog/${post.slug}`}
          aria-label={cardLabel}
          title={`Read: ${post.title}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-lg"
        >
        {cacheBustedImage && (
          <div className={`relative w-full overflow-hidden group ${featured ? 'h-64 sm:h-80 lg:h-96' : 'h-48'}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 dark:from-black/40 via-transparent to-transparent z-10" aria-hidden="true" />
            <Image
              src={cacheBustedImage}
              alt={`Cover image for ${post.title}`}
              fill
              sizes={featured 
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              className="object-cover transition-transform duration-300 group-hover:scale-105 motion-safe:group-hover:scale-105"
              priority={featured}
              loading={featured ? "eager" : "lazy"}
              quality={85}
            />
          </div>
        )}
        <CardHeader className={featured ? 'p-6 lg:p-8' : 'p-5'}>
            <div className="flex flex-wrap gap-2 mb-3" role="list" aria-label="Categories">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category.slug}
                  role="listitem"
                className={`${featured ? 'text-sm px-3 py-1.5' : 'text-xs px-2.5 py-1'} bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-500/10 dark:from-slate-800/40 dark:via-slate-700/40 dark:to-slate-800/40 border border-blue-200/50 dark:border-slate-600/30 text-blue-700 dark:text-slate-200 font-medium rounded-full backdrop-blur-sm`}
              >
                {category.name}
              </span>
            ))}
          </div>
          <CardTitle className={`${featured ? 'text-2xl sm:text-3xl lg:text-4xl line-clamp-2 lg:line-clamp-3' : 'line-clamp-2'} bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent font-bold`}>
            {post.title}
          </CardTitle>
          {post.excerpt && (
            <CardDescription className={`${featured ? 'text-base sm:text-lg lg:text-xl line-clamp-3 lg:line-clamp-4 mt-2' : 'line-clamp-3'} text-slate-600 dark:text-slate-300`}>
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>
        <CardFooter className={`flex items-center justify-between ${featured ? 'text-base px-6 lg:px-8 pb-6 lg:pb-8' : 'text-sm px-5 pb-5'} text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800`}>
            <div className="flex items-center gap-4" role="group" aria-label="Post metadata">
            {post.author.name && (
              <div className="flex items-center gap-1.5">
                  <User 
                    className={`${featured ? 'h-5 w-5' : 'h-4 w-4'} text-slate-400 dark:text-slate-500`} 
                    aria-hidden="true"
                  />
                  <span className="font-medium">
                    <span className="sr-only">Author: </span>
                    {post.author.name}
                  </span>
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1.5">
                  <Clock 
                    className={`${featured ? 'h-5 w-5' : 'h-4 w-4'} text-slate-400 dark:text-slate-500`} 
                    aria-hidden="true"
                  />
                  <span>
                    <span className="sr-only">Reading time: </span>
                    {post.readingTime} min read
                  </span>
              </div>
            )}
          </div>
            {formattedDate && dateTimeValue && (
              <time dateTime={dateTimeValue} className="font-medium">
                <span className="sr-only">Published on: </span>
                {formattedDate}
              </time>
            )}
        </CardFooter>
      </Link>
      </article>
    </Card>
  )
}
