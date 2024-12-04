import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/$eventId/")({
  // In a loader, fetch data
  component: EventComponent,
});

function EventComponent() {
  const { eventId } = Route.useParams();
  return <div>Event ID: {eventId}</div>;
}
