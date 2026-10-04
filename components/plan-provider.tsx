'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export const PLAN_CAP = 5
const STORAGE_KEY = 'fitlog:v1'

type ListName = 'plan' | 'saved'

type PlanContextValue = {
  plan: number[]
  saved: number[]
  hydrated: boolean
  add: (list: ListName, id: number) => void
  remove: (list: ListName, id: number) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<{ plan: number[]; saved: number[] }>({
    plan: [],
    saved: [],
  })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setLists({
          plan: Array.isArray(parsed.plan) ? parsed.plan : [],
          saved: Array.isArray(parsed.saved) ? parsed.saved : [],
        })
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  }, [lists, hydrated])

  const add = (list: ListName, id: number) =>
    setLists((prev) =>
      prev[list].includes(id) ? prev : { ...prev, [list]: [...prev[list], id] },
    )

  const remove = (list: ListName, id: number) =>
    setLists((prev) => ({ ...prev, [list]: prev[list].filter((x) => x !== id) }))

  return (
    <PlanContext.Provider
      value={{ plan: lists.plan, saved: lists.saved, hydrated, add, remove }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error('usePlan must be used within PlanProvider')
  return ctx
}
