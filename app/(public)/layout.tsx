import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-slate-50/30 to-white dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#0a0a0a]">
      <Header />
      <main id="main-content" className="flex-1 relative" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  )
}
