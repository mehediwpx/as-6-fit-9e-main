'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { usePlan } from '@/components/plan-provider'

const links = [
  { href: '/', label: 'Workouts' },
  { href: '/my-plan', label: 'My Plan' },
]

export function Navbar() {
  const pathname = usePathname()
  const { plan, saved } = usePlan()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Logo />
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-4">
          {links.map((link) => {
            const active =
              link.href === '/' ? pathname === '/' || pathname.startsWith('/workouts') : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-2 py-1 text-sm font-medium transition-colors sm:px-3 sm:text-base',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground sm:text-sm"
          >
            Plan <span>{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold sm:text-sm"
          >
            Saved <span>{saved.length}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
