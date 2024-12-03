import { useGetEvents } from "@/hooks/use-clerk-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events")({
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

  console.log(events);

  return <div>Events</div>;
}
