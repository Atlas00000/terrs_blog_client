import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-background">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://pub-5ec1edc03f9e4856bb104bfd7a595f59.r2.dev/2025/12/terra-logo-1766007088872-vqasieccsyq.png"
                alt="Terra Industries Logo"
                width={120}
                height={40}
                sizes="120px"
                className="h-8 w-auto dark:invert mb-3"
                loading="lazy"
                quality={90}
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Protecting Africa&apos;s critical infrastructure with autonomous defense systems.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-foreground transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://twitter.com/Terrahaptix" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/terrahaptix" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Terra Industries. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
