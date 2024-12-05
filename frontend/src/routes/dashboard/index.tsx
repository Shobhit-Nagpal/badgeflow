import { ModuleBentoGrid } from "@/components/dashboard/module-bento-grid";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TopStatsOverview } from "@/components/dashboard/top-stats-overview";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Loader } from "@/components/ui/loader";
import { useGetDashboardMetrics } from "@/hooks/use-clerk-query";
import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

const modules = [
  {
    title: "Events",
    description: "All events",
    icon: Settings,
    image: "/events.svg",
    url: "/dashboard/events",
  },
  {
    title: "Settings",
    description: "Account settings, billing, etc",
    icon: Settings,
    image: "/settings.svg",
    url: "/dashboard/settings",
  },
];

export function Dashboard() {
  const { data: metrics, isError, isLoading } = useGetDashboardMetrics();

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Something went wrong. Please refresh the page.</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Metrics is null.</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <QuickActions />
          </div>
        </div>
        <TopStatsOverview metrics={metrics} />
        <ModuleBentoGrid modules={modules} />
      </div>
    </MaxWidthWrapper>
  );
}
