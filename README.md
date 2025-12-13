# 🎨 Terrablog Client Application

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)

**Modern, responsive frontend for the Terra Industries Blog Platform**

[Quick Start](#-quick-start) • [Features](#-features) • [Development](#-development) • [Testing](#-testing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

The Terrablog Client is a **modern, production-ready** Next.js application built with React, TypeScript, and Tailwind CSS. It provides a beautiful, responsive interface for both public readers and content administrators.

### Key Highlights

- 🚀 **Next.js 14+** - App Router with Server Components
- ⚡ **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧩 **shadcn/ui** - High-quality component library
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant
- 🎭 **Animations** - Smooth transitions with Framer Motion

---

## ✨ Features

### Public Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🏠 **Homepage** | Hero section, featured posts, latest updates | ✅ Complete |
| 📝 **Blog Listing** | Paginated post list with filters | ✅ Complete |
| 📄 **Post Detail** | Full post view with reading time | ✅ Complete |
| 👤 **Author Pages** | Author profiles with bio and posts | ✅ Complete |
| 🏷️ **Category Pages** | Category-based post filtering | ✅ Complete |
| 🏷️ **Tag Pages** | Tag-based post filtering | ✅ Complete |
| 🛍️ **Product Pages** | Product showcase with features | ✅ Complete |
| 💬 **Comments** | Threaded comments with moderation | ✅ Complete |
| 📧 **Newsletter** | Subscription form with preferences | ✅ Complete |
| 📬 **Contact** | Contact form with validation | ✅ Complete |
| 📰 **Press Releases** | Press release listing and detail | ✅ Complete |
| 🔍 **Search** | Full-text search functionality | ✅ Complete |

### Admin Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Authentication** | Login and registration | ✅ Complete |
| 📊 **Dashboard** | Overview statistics and metrics | ✅ Complete |
| 📝 **Post Management** | Create, edit, delete posts | ✅ Complete |
| 🖼️ **Media Library** | Upload and manage media files | ✅ Complete |
| 👥 **User Management** | User CRUD operations | ✅ Complete |
| 📂 **Category Management** | Category CRUD operations | ✅ Complete |
| 🏷️ **Tag Management** | Tag CRUD operations | ✅ Complete |
| 🛍️ **Product Management** | Product CRUD operations | ✅ Complete |
| 💬 **Comment Moderation** | Approve, reject, delete comments | ✅ Complete |
| 📧 **Newsletter Management** | Subscriber management | ✅ Complete |
| 📬 **Contact Management** | View and respond to submissions | ✅ Complete |

### User Experience

- 🎨 **Modern Design** - Clean, professional interface
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Optimized performance with Next.js
- 🔍 **SEO Optimized** - Meta tags, structured data
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🌙 **Dark Mode** - Theme switching (planned)
- 🔔 **Notifications** - Toast notifications for actions

---

## 🛠️ Tech Stack

### Core
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript 5.3** - Type safety

### Styling
- **Tailwind CSS 3.0** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### State Management
- **React Context** - Global state
- **SWR / React Query** - Data fetching (optional)

### API Client
- **Axios / Fetch** - HTTP client
- **Shared Types** - Type-safe API calls

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

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
│  │ • usePosts    │  │ • slugify    │  │ • Theme      │ │
│  │ • useMedia    │  │ • validate   │  │ • Toast      │ │
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

### Project Structure

```
client/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public routes
│   │   ├── blog/            # Blog listing & posts
│   │   ├── products/        # Product pages
│   │   ├── authors/         # Author pages
│   │   ├── contact/         # Contact page
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
│   │   └── ...
│   │
│   ├── blog/               # Blog-specific components
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   ├── CommentSection.tsx
│   │   └── ...
│   │
│   ├── admin/              # Admin components
│   │   ├── PostEditor.tsx
│   │   ├── MediaUpload.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   │
│   └── shared/             # Shared components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Navigation.tsx
│       └── ...
│
├── lib/                    # Utilities and configs
│   ├── api.ts              # API client (Axios wrapper)
│   ├── auth.ts             # Authentication utilities
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # Constants
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   ├── usePosts.ts         # Posts data hook
│   ├── useMedia.ts         # Media data hook
│   └── ...
│
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Auth state
│   ├── ThemeContext.tsx   # Theme state
│   └── ToastContext.tsx   # Toast notifications
│
├── types/                  # TypeScript types
│   ├── api.types.ts        # API response types
│   ├── post.types.ts      # Post types
│   └── user.types.ts       # User types
│
├── public/                 # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── styles/                 # Additional styles
│   └── components.css      # Component-specific styles
│
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API server running (see [Server README](../server/README.md))

### Installation

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

### Environment Variables

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

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start               # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier

# Testing
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Development Workflow

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
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Code Style

- **TypeScript** - Strict type checking
- **ESLint** - Code linting with Next.js rules
- **Prettier** - Code formatting
- **Tailwind CSS** - Utility-first styling

### Component Development

#### Creating a New Component

```typescript
// components/blog/PostCard.tsx
import { Post } from '@/types/post.types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.excerpt}</p>
    </div>
  );
}
```

#### Using the API Client

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get('/v1/posts');
      return data;
    },
  });
}
```

---

## 🧪 Testing

### Testing Philosophy

We follow **industry best practices** for frontend testing:

- ✅ **Unit Tests** - Test components in isolation
- ✅ **Integration Tests** - Test component interactions
- ✅ **E2E Tests** - Test complete user journeys
- ✅ **Accessibility Tests** - Ensure WCAG compliance

### Test Structure

```
__tests__/
├── components/           # Component tests
│   ├── PostCard.test.tsx
│   └── ...
├── hooks/                # Hook tests
│   ├── useAuth.test.ts
│   └── ...
├── utils/                # Utility tests
│   ├── formatDate.test.ts
│   └── ...
└── e2e/                  # E2E tests
    ├── blog.spec.ts
    └── ...
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Testing Best Practices

#### Component Testing

```typescript
// __tests__/components/PostCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PostCard } from '@/components/blog/PostCard';

describe('PostCard', () => {
  it('should render post title and excerpt', () => {
    const post = {
      id: '1',
      title: 'Test Post',
      excerpt: 'Test excerpt',
      slug: 'test-post',
    };

    render(<PostCard post={post} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt')).toBeInTheDocument();
  });
});
```

#### Hook Testing

```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

describe('useAuth', () => {
  it('should return user when authenticated', () => {
    const { result } = renderHook(() => useAuth());
    // Test implementation
  });
});
```

#### E2E Testing

```typescript
// __tests__/e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test('should display blog posts', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.locator('h1')).toContainText('Blog');
  await expect(page.locator('[data-testid="post-card"]')).toHaveCount(10);
});
```

### Coverage Goals

- **Unit Tests**: 80%+ coverage for components and hooks
- **Integration Tests**: Critical user flows
- **E2E Tests**: Complete user journeys

---

## 🚢 Deployment

### Prerequisites

- Vercel account (recommended) or similar hosting
- Environment variables configured
- Backend API deployed and accessible

### Deployment Options

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

### Environment Variables

Configure these in your hosting platform:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/api
NEXT_PUBLIC_APP_NAME=Terra Industries Blog
NEXT_PUBLIC_APP_URL=https://example.com
```

---

## 🐛 Troubleshooting

### Common Issues

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

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Server API Documentation](../server/README.md)

---

## 📄 License

**UNLICENSED** - Proprietary to Terra Industries

---

<div align="center">

**Built with ❤️ using Next.js, React, and TypeScript**

[⬆ Back to Top](#-terrablog-client-application)

</div>
