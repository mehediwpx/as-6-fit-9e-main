import Link from 'next/link'
import { Check, X } from 'lucide-react'
import type { Workout } from '@/lib/workouts'
import { WorkoutStats } from '@/components/workout-stats'

type PlanItemProps = {
  workout: Workout
  showDone: boolean
  onDone: () => void
  onRemove: () => void
}

export function PlanItem({ workout, showDone, onDone, onRemove }: PlanItemProps) {
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image || '/placeholder.svg'}
          alt=""
          className="size-16 shrink-0 rounded-lg object-cover sm:size-18"
        />
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-bold uppercase">{workout.name}</h3>
          <p className="text-sm text-muted-foreground">{workout.equipment}</p>
          <WorkoutStats workout={workout} />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-md border border-border px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          View Details
        </Link>
        {showDone && (
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Check className="size-4" aria-hidden="true" />
            Mark as Done
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
