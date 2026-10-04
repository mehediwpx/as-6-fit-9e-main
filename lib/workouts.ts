export type Workout = {
  id: number
  name: string
  image: string
  muscleGroups: string[]
  equipment: string
  difficulty: string
  duration: number
  caloriesBurned: number
  sets: number
  reps: string
  rating: number
  description: string
  instructions: string[]
}

const API_BASES = [
  'https://api.abcz.workers.dev/api/fitlog',
  'https://api.api-store.workers.dev/api/fitlog',
]

async function fetchWithFallback<T>(path: string): Promise<T> {
  let lastError: unknown
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${path}`)
      if (res.ok) return (await res.json()) as T
      if (res.status === 404) throw new Error('NOT_FOUND')
      lastError = new Error(`Request failed: ${res.status}`)
    } catch (error) {
      if (error instanceof Error && error.message === 'NOT_FOUND') throw error
      lastError = error
    }
  }
  throw lastError
}

export function getWorkouts() {
  return fetchWithFallback<Workout[]>('')
}

export function getWorkout(id: string) {
  return fetchWithFallback<Workout>(`/${id}`)
}
