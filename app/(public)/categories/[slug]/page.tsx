import { api } from '@/lib/api'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/blog/post-card'
import { Button } from '@/components/ui/button'

interface Category {
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

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await api.get<{ data: Category }>(`/v1/categories/${slug}`)
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null
    }
    return null
  }
}

async function getCategoryPosts(slug: string, page: number = 1): Promise<{
  data: Post[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
}> {
  try {
    const response = await api.get(`/v1/posts?category=${slug}&page=${page}&limit=12&status=PUBLISHED`)
    return response
  } catch (error) {
    return {
      data: [],
      pagination: { page: 1, limit: 12, total: 0, totalPages: 0 },
    }
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { page?: string }
}) {
  const category = await getCategory(params.slug)
  const page = parseInt(searchParams.page || '1', 10)

  if (!category) {
    notFound()
  }

  const { data: posts, pagination } = await getCategoryPosts(params.slug, page)

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-xl text-muted-foreground">{category.description}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found in this category.</p>
          <Button asChild className="mt-4">
            <a href="/blog">Browse All Posts</a>
          </Button>
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
                  <a href={`/categories/${params.slug}?page=${page - 1}`}>Previous</a>
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              {page < pagination.totalPages && (
                <Button asChild variant="outline">
                  <a href={`/categories/${params.slug}?page=${page + 1}`}>Next</a>
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
