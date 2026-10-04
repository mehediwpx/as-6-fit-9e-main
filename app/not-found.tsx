import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="font-display text-3xl font-bold uppercase">Missed the rep</h1>
      <p className="text-muted-foreground">{"This page doesn't exist. Head back to the library and pick a lift."}</p>
      <Link
        href="/"
        className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  )
}
