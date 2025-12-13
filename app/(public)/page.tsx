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

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const page = parseInt(searchParams.page || '1', 10)
  const search = searchParams.search || undefined
  const { data: posts, pagination } = await getPosts(page, 12, search)

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terra Industries Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thought leadership and insights on autonomous defense systems for Africa&apos;s critical infrastructure
        </p>
      </div>

      {search && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Search results for &quot;{search}&quot; ({pagination.total} {pagination.total === 1 ? 'post' : 'posts'})
          </p>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {search ? `No posts found for "${search}".` : 'No posts found.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              {page > 1 && (
                <Button asChild variant="outline">
                  <a href={`/?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}>Previous</a>
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              {page < pagination.totalPages && (
                <Button asChild variant="outline">
                  <a href={`/?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}>Next</a>
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
