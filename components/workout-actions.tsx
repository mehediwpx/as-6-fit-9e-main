'use client'

import { Bookmark, CalendarPlus } from 'lucide-react'
import { toast } from 'sonner'
import { PLAN_CAP, usePlan } from '@/components/plan-provider'

export function WorkoutActions({ workoutId, workoutName }: { workoutId: number; workoutName: string }) {
  const { plan, saved, add } = usePlan()
  const inPlan = plan.includes(workoutId)
  const isSaved = saved.includes(workoutId)
  const planFull = plan.length >= PLAN_CAP

  const handleAddToPlan = () => {
    if (inPlan) return toast.info(`${workoutName} is already in today's plan`)
    if (planFull) return toast.error(`Today's plan is capped at ${PLAN_CAP} lifts`)
    add('plan', workoutId)
    toast.success(`Added ${workoutName} to today's plan`)
  }

  const handleSave = () => {
    if (isSaved) return toast.info(`${workoutName} is already saved`)
    add('saved', workoutId)
    toast.success(`Saved ${workoutName} for later`)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={planFull && !inPlan}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus className="size-4" aria-hidden="true" />
        {inPlan ? "In today's plan" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        <Bookmark className={isSaved ? 'size-4 fill-current' : 'size-4'} aria-hidden="true" />
        {isSaved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  )
}
