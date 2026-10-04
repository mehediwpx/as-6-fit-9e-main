'use client'

import useSWR from 'swr'
import { getWorkouts } from '@/lib/workouts'

export function useWorkouts() {
  return useSWR('workouts', getWorkouts, { revalidateOnFocus: false })
}
