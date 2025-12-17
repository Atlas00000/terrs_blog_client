import { api } from '@/lib/api'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/blog/post-card'
import { Button } from '@/components/ui/button'

interface Tag {
  id: string
  name: string
  slug: string
  description: string | null
}

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

async function getTag(slug: string): Promise<Tag | null> {
  try {
    const response = await api.get<{ data: Tag }>(`/v1/tags/${slug}`)
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null
    }
    return null
  }
}

async function getTagPosts(slug: string, page: number = 1): Promise<{
  data: Post[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
}> {
  try {
    const response = await api.get(`/v1/posts?tag=${slug}&page=${page}&limit=12&status=PUBLISHED`)
    return response
  } catch (error) {
    return {
      data: [],
      pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
    }
  }
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { page?: string }
}) {
  const tag = await getTag(params.slug)
  const page = parseInt(searchParams.page || '1', 10)

  if (!tag) {
    notFound()
  }

  const { data: posts, pagination } = await getTagPosts(params.slug, page)

  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-[85%] max-w-6xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">#{tag.name}</h1>
          {tag.description && (
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">{tag.description}</p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-muted-foreground">No posts found with this tag.</p>
            <Button asChild size="sm" className="mt-4">
              <a href="/">Browse All Posts</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                {page > 1 && (
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium transition-all duration-200">
                    <a href={`/tags/${params.slug}?page=${page - 1}`}>Previous</a>
                  </Button>
                )}
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                {page < pagination.totalPages && (
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium transition-all duration-200">
                    <a href={`/tags/${params.slug}?page=${page + 1}`}>Next</a>
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
