import { api } from '@/lib/api'
import { PostCard } from '@/components/blog/post-card'
import { Button } from '@/components/ui/button'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  status: string
  readingTime: number | null
  publishedAt: string | null
  author: {
    id: string
    name: string | null
    email: string
    avatar: string | null
  }
  categories: Array<{ id: string; name: string; slug: string }>
  tags: Array<{ id: string; name: string; slug: string }>
}

interface PostsResponse {
  data: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

async function getPosts(page: number = 1, limit: number = 12, search?: string): Promise<PostsResponse> {
  try {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
      status: 'PUBLISHED',
    }
    if (search && search.trim()) {
      params.search = search.trim()
    }
    const response = await api.get<PostsResponse>('/v1/posts', { params })
    return response
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      },
    }
  }
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const page = parseInt(searchParams.page || '1', 10)
  const search = searchParams.search || undefined
  const { data: posts, pagination } = await getPosts(page, 12, search)

  return (
    <div className="flex justify-center relative">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-white dark:from-[#0a0a0a] dark:via-transparent dark:to-[#0a0a0a] pointer-events-none" />
      <div className="w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8 md:py-12 relative z-10">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-slate-50/40 dark:from-slate-900/20 dark:via-transparent dark:to-slate-900/20 rounded-3xl -z-10 blur-3xl" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Terra Industries Blog
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-2 font-medium">
            Thought leadership and insights on autonomous defense systems for Africa&apos;s critical infrastructure
          </p>
        </div>

        {search && (
          <div className="mb-6 text-left">
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Search results for &quot;{search}&quot; ({pagination.total} {pagination.total === 1 ? 'post' : 'posts'})
            </p>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
              {search ? `No posts found for "${search}".` : 'No posts found.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {posts.map((post, index) => {
                // Make the first post (latest) stand out on desktop - only on first page and no search
                const isFeatured = index === 0 && page === 1 && !search
                return (
                  <div
                    key={post.id}
                    className={isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}
                  >
                    <PostCard post={post} featured={isFeatured} />
                  </div>
                )
              })}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                {page > 1 && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium transition-all duration-200"
                  >
                    <a href={`/?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}>Previous</a>
                  </Button>
                )}
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                {page < pagination.totalPages && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium transition-all duration-200"
                  >
                    <a href={`/?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}>Next</a>
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
