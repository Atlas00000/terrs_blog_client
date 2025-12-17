'use client'

import dynamic from 'next/dynamic'

const CommentForm = dynamic(() => import('./comment-form').then(mod => ({ default: mod.CommentForm })), {
  loading: () => <div className="text-sm text-muted-foreground">Loading comment form...</div>
})

const CommentList = dynamic(() => import('./comment-list').then(mod => ({ default: mod.CommentList })), {
  loading: () => <div className="text-sm text-muted-foreground">Loading comments...</div>
})

interface CommentsSectionProps {
  slug: string
}

export function CommentsSection({ slug }: CommentsSectionProps) {
  return (
    <>
      <CommentForm slug={slug} />
      <CommentList slug={slug} />
    </>
  )
}
