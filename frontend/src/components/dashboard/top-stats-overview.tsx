import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  { title: "Total Events", value: "120", icon: CalendarDays, change: "+8%" },
  { title: "Total Attendees", value: "5,240", icon: Users, change: "+12%" },
  { title: "Revenue", value: "$45,000", icon: DollarSign, change: "+5.2%" },
  { title: "Engagement Rate", value: "86%", icon: TrendingUp, change: "+2.5%" },
]

export function TopStatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
