import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TDashboardMetrics } from "@/types";
import { CalendarDays, Users, DollarSign, TrendingUp } from "lucide-react";

type TopStatsOverviewProps = {
  metrics: TDashboardMetrics;
};

export function TopStatsOverview({ metrics }: TopStatsOverviewProps) {
  const stats = [
    {
      title: "Total Events",
      value: metrics.total_events,
      icon: CalendarDays,
      change: "+8%",
    },
    {
      title: "Total Attendees",
      value: metrics.total_attendees,
      icon: Users,
      change: "+12%",
    },
    {
      title: "Revenue",
      value: metrics.total_revenue,
      icon: DollarSign,
      change: "+5.2%",
    },
    {
      title: "Engagement Rate",
      value: metrics.engagement_rate,
      icon: TrendingUp,
      change: "+2.5%",
    },
  ];

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
              <span className="text-green-500">{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
