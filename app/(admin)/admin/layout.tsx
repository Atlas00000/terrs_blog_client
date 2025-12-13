'use client'

import { AuthProvider } from '@/context/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { usePathname } from 'next/navigation'

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
