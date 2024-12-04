import { Events } from "@/components/dashboard/events";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { useGetEvents } from "@/hooks/use-clerk-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/")({
  component: EventsPage,
});

function EventsPage() {
  const { data: events, isError, isLoading } = useGetEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Something went wrong. Please refresh the page.</p>
      </div>
    );
  }

  if (!events) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Events is null.</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <div className="flex items-center space-x-2">
            <QuickActions />
          </div>
        </div>
        <Events events={events} />
      </div>
    </MaxWidthWrapper>
  );
}
