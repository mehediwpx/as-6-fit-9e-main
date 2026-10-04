import Link from 'next/link'
import { Dumbbell } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide',
        className,
      )}
    >
      <Dumbbell className="size-5 -rotate-45 text-primary" aria-hidden="true" />
      FitLog
    </Link>
  )
}
