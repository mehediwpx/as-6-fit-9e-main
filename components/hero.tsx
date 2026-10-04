import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 md:px-6 md:pt-12">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:p-12">
        <div className="flex flex-col items-start gap-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Workout Library
          </p>
          <h1 className="text-balance font-display text-4xl font-bold uppercase leading-none md:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            {"FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up."}
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowDown className="size-4" aria-hidden="true" />
            Browse Workouts
          </a>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <Image
            src="/images/hero-athlete.png"
            alt="3D athlete training on a stationary bike"
            fill
            priority
            sizes="(min-width: 768px) 384px, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
