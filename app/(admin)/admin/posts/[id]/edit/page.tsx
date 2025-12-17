'use client'

import dynamic from 'next/dynamic'

const PostForm = dynamic(() => import('@/components/admin/post-form').then(mod => ({ default: mod.PostForm })), {
  loading: () => <div className="p-8">Loading form...</div>
})

export default function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  return <PostForm postId={params.id} />
}

