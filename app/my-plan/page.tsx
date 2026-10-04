import type { Metadata } from 'next'
import { MyPlan } from '@/components/my-plan'

export const metadata: Metadata = { title: 'My Plan — FitLog' }

export default function MyPlanPage() {
  return <MyPlan />
}
