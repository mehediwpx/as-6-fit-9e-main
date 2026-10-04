import { Clock, Flame, Star } from 'lucide-react'
import type { Workout } from '@/lib/workouts'

export function WorkoutStats({ workout }: { workout: Workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
      <span className="flex items-center gap-1">
        <Clock className="size-3.5" aria-hidden="true" />
        {workout.duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame className="size-3.5" aria-hidden="true" />
        {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
        <span className="sr-only">Rating</span>
        {workout.rating}
      </span>
    </div>
  )
}
