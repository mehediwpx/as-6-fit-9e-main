import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row md:px-6">
        <Logo className="text-base text-foreground" />
        <p>{'© 2026 FitLog — Workout Library. Train hard, log honest.'}</p>
      </div>
    </footer>
  )
}
