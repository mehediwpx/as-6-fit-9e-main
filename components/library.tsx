'use client'

import { useWorkouts } from '@/hooks/use-workouts'
import { WorkoutCard } from '@/components/workout-card'
import { Spinner } from '@/components/spinner'

export function Library() {
  const { data, error, isLoading } = useWorkouts()

  return (
    <section id="library" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:px-6">
      <h2 className="font-display text-3xl font-bold uppercase">The Library</h2>
      <p className="mb-6 text-muted-foreground">Twelve lifts covering every major muscle group.</p>

      {isLoading && <Spinner label="Loading workouts…" />}
      {error && (
        <p className="py-16 text-center text-destructive">
          Could not load workouts. Please try again later.
        </p>
      )}
      {data && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  )
}
