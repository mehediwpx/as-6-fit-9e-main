import Link from 'next/link'
import type { Workout } from '@/lib/workouts'
import { WorkoutStats } from '@/components/workout-stats'

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image || '/placeholder.svg'}
          alt={workout.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground"
            >
              {group}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold uppercase">{workout.name}</h3>
          <p className="text-sm text-muted-foreground">{workout.equipment}</p>
        </div>
        <div className="mt-auto">
          <WorkoutStats workout={workout} />
        </div>
      </div>
    </Link>
  )
}
