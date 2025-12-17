# 🎨 Terrablog Client Application

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-green.svg)

**Modern, responsive frontend for the Terra Industries Blog Platform**

[Quick Start](#-quick-start) • [Features](#-features) • [Development](#-development) • [Performance](#-performance-optimizations)

---

![Terra Industries Logo](https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev/2025/12/terra-logo-1766007088872-vqasieccsyq.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Performance Optimizations](#-performance-optimizations)
- [Accessibility](#-accessibility)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

The Terrablog Client is a **modern, production-ready** Next.js application built with React, TypeScript, and Tailwind CSS. It provides a beautiful, responsive interface for both public readers and content administrators.

### ✨ Key Highlights

| Feature | Description |
|---------|-------------|
| 🚀 **Next.js 14+** | App Router with Server Components and ISR |
| ⚡ **TypeScript** | Full type safety across the application |
| 🎨 **Tailwind CSS** | Utility-first styling with dark mode |
| 🧩 **shadcn/ui** | High-quality, accessible component library |
| 📱 **Responsive** | Mobile-first design that works on all devices |
| ♿ **Accessible** | WCAG 2.1 AA compliant with full keyboard navigation |
| ⚡ **Performance** | Optimized with lazy loading, code splitting, and caching |
| 🎭 **Smooth UX** | Beautiful loading screens and transitions |
| 🔍 **SEO Optimized** | Meta tags, structured data, and semantic HTML |
| 🌙 **Dark Mode** | Full dark mode support with system preference detection |

---

## ✨ Features

### 🌐 Public Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🏠 **Homepage** | Hero section, featured posts, latest updates | ✅ Complete |
| 📝 **Blog Listing** | Paginated post list with filters and search | ✅ Complete |
| 📄 **Post Detail** | Full post view with reading time and metadata | ✅ Complete |
| 👤 **Author Pages** | Author profiles with bio and posts | ✅ Complete |
| 🏷️ **Category Pages** | Category-based post filtering | ✅ Complete |
| 🏷️ **Tag Pages** | Tag-based post filtering | ✅ Complete |
| 🛍️ **Product Pages** | Product showcase with features | ✅ Complete |
| 💬 **Comments** | Threaded comments with moderation | ✅ Complete |
| 📧 **Newsletter** | Subscription form with preferences | ✅ Complete |
| 📬 **Contact** | Contact form with validation | ✅ Complete |
| 📰 **Press Releases** | Press release listing and detail | ✅ Complete |
| 🔍 **Search** | Full-text search with suggestions | ✅ Complete |

### 🔐 Admin Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Authentication** | Secure login and registration | ✅ Complete |
| 📊 **Dashboard** | Overview statistics and metrics | ✅ Complete |
| 📝 **Post Management** | Create, edit, delete posts with rich editor | ✅ Complete |
| 🖼️ **Media Library** | Upload and manage media files | ✅ Complete |
| 👥 **User Management** | User CRUD operations with roles | ✅ Complete |
| 📂 **Category Management** | Category CRUD operations | ✅ Complete |
| 🏷️ **Tag Management** | Tag CRUD operations | ✅ Complete |
| 🛍️ **Product Management** | Product CRUD operations | ✅ Complete |
| 💬 **Comment Moderation** | Approve, reject, delete comments | ✅ Complete |
| 📧 **Newsletter Management** | Subscriber management | ✅ Complete |
| 📬 **Contact Management** | View and respond to submissions | ✅ Complete |

### 🎨 User Experience

- 🎨 **Modern Design** - Clean, professional interface with Terra Industries branding
- 📱 **Responsive** - Works seamlessly on all devices (mobile, tablet, desktop)
- ⚡ **Fast** - Optimized performance with Next.js ISR and code splitting
- 🔍 **SEO Optimized** - Meta tags, structured data, and semantic HTML
- ♿ **Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- 🌙 **Dark Mode** - Full dark mode support with smooth transitions
- 🔔 **Notifications** - Toast notifications for user actions
- 🎭 **Smooth Animations** - Beautiful loading screens and transitions
- 🔍 **Smart Search** - Real-time search suggestions with keyboard navigation

---

## 🛠️ Tech Stack

### 🎯 Core

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 14+ |
| **React** | UI library | 18+ |
| **TypeScript** | Type safety | 5.3 |

### 🎨 Styling

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | High-quality component library |
| **Lucide React** | Icon library with tree-shaking |
| **next-themes** | Dark mode support |

### 📝 Forms & Validation

| Technology | Purpose |
|------------|---------|
| **React Hook Form** | Form management |
| **Zod** | Schema validation |
| **@hookform/resolvers** | Form validation integration |

### 🔄 State Management

| Technology | Purpose |
|------------|---------|
| **React Context** | Global state (Auth, Theme) |
| **React Query** | Data fetching and caching (optional) |

### 🌐 API Client

| Technology | Purpose |
|------------|---------|
| **Axios** | HTTP client |
| **Shared Types** | Type-safe API calls |

### 🛠️ Development

| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **TypeScript** | Type checking |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Next.js Application                     │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   App Router  │  │  Components  │  │   API Client  │ │
│  │               │  │              │  │               │ │
│  │ • (public)/   │  │ • UI         │  │ • Axios       │ │
│  │ • (admin)/    │  │ • Blog       │  │ • Types      │ │
│  │ • layout.tsx  │  │ • Admin      │  │ • Hooks      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Hooks       │  │   Utils      │  │   Context    │ │
│  │               │  │              │  │              │ │
│  │ • useAuth     │  │ • formatDate │  │ • Auth       │ │
│  │ • useToast    │  │ • cn         │  │ • Theme      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└───────────────────────┬─────────────────────────────────┘
                         │
                         │ REST API
                         │
┌────────────────────────┴─────────────────────────────────┐
│              Backend API Server                          │
│         (http://localhost:3001/api)                      │
└──────────────────────────────────────────────────────────┘
```

### 📁 Project Structure

```
client/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public routes
│   │   ├── blog/            # Blog listing & posts
│   │   ├── categories/       # Category pages
│   │   ├── tags/           # Tag pages
│   │   └── page.tsx         # Homepage
│   │
│   ├── (admin)/             # Admin routes (protected)
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── posts/      # Post management
│   │   │   ├── media/      # Media library
│   │   │   ├── users/      # User management
│   │   │   └── layout.tsx  # Admin layout
│   │   └── login/          # Login page
│   │
│   ├── layout.tsx           # Root layout
│   └── globals.css         # Global styles
│
├── components/             # React components
│   ├── ui/                 # Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── blog/               # Blog-specific components
│   │   └── post-card.tsx
│   │
│   ├── admin/              # Admin components (lazy loaded)
│   │   ├── admin-sidebar.tsx
│   │   ├── admin-header.tsx
│   │   ├── post-form.tsx
│   │   └── ...
│   │
│   ├── comments/           # Comment components (lazy loaded)
│   │   ├── comment-form.tsx
│   │   ├── comment-list.tsx
│   │   └── comments-section.tsx
│   │
│   ├── shared/             # Shared components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── search-bar.tsx
│   │   ├── loading-screen.tsx
│   │   └── ...
│   │
│   └── providers/          # Context providers
│       └── query-provider.tsx
│
├── lib/                    # Utilities and configs
│   ├── api.ts              # API client (Axios wrapper)
│   ├── api/
│   │   ├── admin.ts        # Admin API functions
│   │   └── comments.ts     # Comments API functions
│   ├── utils.ts            # Helper functions
│   └── types.ts            # TypeScript types
│
├── context/                # React Context providers
│   └── auth-context.tsx     # Auth state
│
├── hooks/                  # Custom React hooks
│   └── use-toast.ts        # Toast notifications
│
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 18+ and npm
- **Backend API server** running (see [Server README](../server/README.md))

### 🛠️ Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### 🔧 Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Terra Industries Blog
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_COMMENTS=true
NEXT_PUBLIC_ENABLE_NEWSLETTER=true
```

---

## 💻 Development

### 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Bundle Analysis (optional)
ANALYZE=true npm run build  # Analyze bundle size
```

### 🔄 Development Workflow

1. **Start the backend server** (in a separate terminal)
   ```bash
   cd ../server
   npm run dev
   ```

2. **Start the frontend** (in this directory)
   ```bash
   npm run dev
   ```

3. **Access the application**
   - 🌐 Frontend: http://localhost:3000
   - 🔌 Backend API: http://localhost:3001

### 📝 Code Style

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting with Next.js rules
- **Prettier** - Code formatting (if configured)
- **Tailwind CSS** - Utility-first styling

### 🧩 Component Development

#### Creating a New Component

```typescript
// components/blog/PostCard.tsx
import { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card className={featured ? 'border-2' : ''}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
      </CardHeader>
    </Card>
  )
}
```

---

## ⚡ Performance Optimizations

### ✅ Implemented Optimizations

| Optimization | Description | Status |
|--------------|-------------|--------|
| 🖼️ **Image Optimization** | Lazy loading, responsive sizes, quality optimization | ✅ Complete |
| 📦 **Code Splitting** | Lazy loading for admin and comment components | ✅ Complete |
| 💾 **Caching** | ISR, HTTP cache headers, React Query ready | ✅ Complete |
| 🎯 **Bundle Optimization** | Webpack optimization, tree-shaking, vendor chunks | ✅ Complete |
| 🔗 **Resource Hints** | Preconnect/DNS-prefetch for CDN | ✅ Complete |
| ⚡ **ISR** | Incremental Static Regeneration for blog posts | ✅ Complete |

### 📊 Performance Metrics

- **Lighthouse Score**: Target 90+
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: Optimized with code splitting

### 🎯 Bundle Size Optimization

- **Vendor Chunk Separation** - Node modules in separate chunk
- **Common Chunk** - Shared code extracted
- **Tree-shaking** - Unused code eliminated
- **Lazy Loading** - Components loaded on demand
- **Dynamic Imports** - Route-based code splitting

---

## ♿ Accessibility

### ✅ WCAG 2.1 AA Compliance

| Feature | Implementation |
|---------|----------------|
| **Keyboard Navigation** | All interactive elements are keyboard accessible |
| **Screen Readers** | Proper ARIA labels and semantic HTML |
| **Focus Indicators** | Visible focus rings on all interactive elements |
| **Skip Links** | Skip to main content link in header |
| **Alt Text** | All images have descriptive alt text |
| **Color Contrast** | All text meets WCAG AA contrast ratios |
| **Form Labels** | All form inputs have associated labels |
| **ARIA Attributes** | Proper use of ARIA roles and properties |

### 🎯 Accessibility Features

- ✅ **Skip to main content** link
- ✅ **ARIA labels** on all interactive elements
- ✅ **Keyboard navigation** for all features
- ✅ **Screen reader** compatible
- ✅ **Focus management** for modals and dialogs
- ✅ **Semantic HTML** throughout
- ✅ **Title attributes** for hover tooltips

---

## 🧪 Testing

### 🎯 Testing Philosophy

We follow **industry best practices** for frontend testing:

- ✅ **Unit Tests** - Test components in isolation
- ✅ **Integration Tests** - Test component interactions
- ✅ **E2E Tests** - Test complete user journeys (planned)
- ✅ **Accessibility Tests** - Ensure WCAG compliance

### 🏃 Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests (when configured)
npm run test:e2e
```

### 📊 Coverage Goals

- **Unit Tests**: 80%+ coverage for components and hooks
- **Integration Tests**: Critical user flows
- **E2E Tests**: Complete user journeys

---

## 🚢 Deployment

### 📋 Prerequisites

- Vercel account (recommended) or similar hosting
- Environment variables configured
- Backend API deployed and accessible

### 🚀 Deployment Options

#### Option 1: Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically deploy on push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option 2: Docker

```bash
# Build Docker image
docker build -t terrablog-client .

# Run container
docker run -p 3000:3000 terrablog-client
```

#### Option 3: Static Export

```bash
# Build static site
npm run build
npm run export

# Deploy the 'out' directory to any static host
```

### 🔧 Environment Variables

Configure these in your hosting platform:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/api
NEXT_PUBLIC_APP_NAME=Terra Industries Blog
NEXT_PUBLIC_APP_URL=https://example.com
```

---

## 🐛 Troubleshooting

### ❓ Common Issues

#### API Connection Errors

```bash
# Check API server is running
curl http://localhost:3001/health

# Verify environment variables
echo $NEXT_PUBLIC_API_URL
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Type Errors

```bash
# Run type checking
npm run type-check

# Regenerate types from shared package
cd ../shared && npm run build
```

#### Image Loading Issues

```bash
# Check Next.js image configuration
# Verify remotePatterns in next.config.js
# Ensure CDN URL is correct
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Server API Documentation](../server/README.md)
- [Root README](../README.md)

---

## 📄 License

**UNLICENSED** - Proprietary to Terra Industries

---

<div align="center">

**Built with ❤️ using Next.js, React, and TypeScript**

[⬆ Back to Top](#-terrablog-client-application)

</div>
