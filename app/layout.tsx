import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { InitialLoader } from '@/components/shared/initial-loader'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Terra Industries Blog',
  description: 'Thought leadership and insights on autonomous defense systems for Africa\'s critical infrastructure',
  keywords: ['defense technology', 'autonomous systems', 'critical infrastructure', 'Africa', 'Terra Industries'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev" />
      </head>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            <AuthProvider>
              <InitialLoader>
                {children}
              </InitialLoader>
              <Toaster />
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
