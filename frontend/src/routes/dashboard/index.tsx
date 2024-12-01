import { QuickActions } from '@/components/dashboard/quick-actions'
import { TopStatsOverview } from '@/components/dashboard/top-stats-overview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

export function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <QuickActions />
        </div>
      </div>
      <TopStatsOverview />
    </div>
  )
}
