import { redirect } from 'next/navigation'

// Redirect /blog to homepage since blog is now the homepage
export default function BlogPage() {
  redirect('/')
}
