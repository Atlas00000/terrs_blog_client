'use client'

import { AuthProvider } from '@/context/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const AdminSidebar = dynamic(() => import('@/components/admin/admin-sidebar').then(mod => ({ default: mod.AdminSidebar })), {
  ssr: false,
  loading: () => <div className="w-64 bg-background border-r" />
})

const AdminHeader = dynamic(() => import('@/components/admin/admin-header').then(mod => ({ default: mod.AdminHeader })), {
  ssr: false,
  loading: () => <div className="h-16 bg-background border-b" />
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <ProtectedRoute requiredRole="ADMIN">
          <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto p-8">
                {children}
              </main>
            </div>
          </div>
        </ProtectedRoute>
      )}
    </AuthProvider>
  )
}
