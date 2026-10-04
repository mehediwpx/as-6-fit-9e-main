'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { usePlan } from '@/components/plan-provider'
import { useWorkouts } from '@/hooks/use-workouts'
import { Spinner } from '@/components/spinner'
import { PlanItem } from '@/components/plan-item'
import { cn } from '@/lib/utils'
import type { Workout } from '@/lib/workouts'

type Tab = 'plan' | 'saved'
type SortKey = 'duration' | 'caloriesBurned' | 'rating'

const tabs: { id: Tab; label: string }[] = [
  { id: 'plan', label: "Today's Plan" },
  { id: 'saved', label: 'Saved' },
]

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'duration', label: 'Duration' },
  { value: 'caloriesBurned', label: 'Calories' },
  { value: 'rating', label: 'Rating' },
]

export function MyPlan() {
  const { plan, saved, hydrated, remove } = usePlan()
  const { data: workouts, isLoading, error } = useWorkouts()
  const [activeTab, setActiveTab] = useState<Tab>('plan')
  const [sortBy, setSortBy] = useState<SortKey>('duration')

  const ids = activeTab === 'plan' ? plan : saved
  const items: Workout[] = (workouts ?? [])
    .filter((w) => ids.includes(w.id))
    .sort((a, b) => a[sortBy] - b[sortBy])

  // Stats reflect whichever list is currently shown.
  const totalMinutes = items.reduce((sum, w) => sum + w.duration, 0)
  const totalCalories = items.reduce((sum, w) => sum + w.caloriesBurned, 0)

  const stats = [
    { label: 'Exercises', value: items.length },
    { label: 'Minutes', value: totalMinutes },
    { label: 'Calories', value: totalCalories },
  ]

  const handleDone = (workout: Workout) => {
    remove('plan', workout.id)
    toast.success(`${workout.name} marked as done`)
  }

  const handleRemove = (workout: Workout) => {
    remove(activeTab, workout.id)
    toast(`Removed ${workout.name} from ${activeTab === 'plan' ? "today's plan" : 'saved'}`)
  }

  const loading = isLoading || !hydrated

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-4xl font-bold uppercase md:text-5xl">My Plan</h1>
      <p className="mt-1 text-muted-foreground">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            <p className="mt-1 font-display text-4xl font-bold text-primary">{loading ? 0 : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Plan lists" className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-md border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors',
                activeTab === tab.id
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          Sort By
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div role="tabpanel" className="mt-5">
        {loading ? (
          <Spinner label="Loading workouts…" />
        ) : error ? (
          <p className="py-16 text-center text-destructive">Could not load workouts.</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="text-sm text-muted-foreground">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((workout) => (
              <PlanItem
                key={workout.id}
                workout={workout}
                showDone={activeTab === 'plan'}
                onDone={() => handleDone(workout)}
                onRemove={() => handleRemove(workout)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
