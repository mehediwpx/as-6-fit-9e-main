import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWorkout, type Workout } from '@/lib/workouts'
import { WorkoutActions } from '@/components/workout-actions'

async function loadWorkout(id: string): Promise<Workout | null> {
  if (!/^\d+$/.test(id)) return null
  try {
    return await getWorkout(id)
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const workout = await loadWorkout(id)
  return { title: workout ? `${workout.name} — FitLog` : 'Workout not found — FitLog' }
}

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const workout = await loadWorkout(id)
  if (!workout) notFound()

  const specs = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', workout.rating],
  ] as const

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6 md:py-14">
      <div className="overflow-hidden rounded-xl border border-border bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image || '/placeholder.svg'}
          alt={workout.name}
          className="aspect-[4/5] size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-3xl font-bold uppercase md:text-4xl">{workout.name}</h1>
          <p className="leading-relaxed text-muted-foreground">{workout.description}</p>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground"
              >
                {group}
              </span>
            ))}
          </div>
        </div>

        <dl className="divide-y divide-border rounded-xl border border-border bg-card">
          {specs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h2 className="mb-3 font-display text-lg font-bold uppercase">Instructions</h2>
          <ol className="flex flex-col gap-2.5">
            {workout.instructions.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <WorkoutActions workoutId={workout.id} workoutName={workout.name} />
      </div>
    </div>
  )
}
