import { CreateAttendee } from "@/components/create-attendee";
import { AttendeesTable } from "@/components/dashboard/attendees-table";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Loader } from "@/components/ui/loader";
import { useGetAttendees } from "@/hooks/use-clerk-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/events/$eventId/attendees")({
  component: AttendeesPage,
});

function AttendeesPage() {
  const { eventId } = Route.useParams();
  const { data: attendees, isError, isLoading } = useGetAttendees(eventId);
  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <Loader size="lg" text="Loading attendees..." />
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

  if (!attendees) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Metrics is null.</p>
      </div>
    );
  }

  console.log(attendees);

  return (
    <MaxWidthWrapper>
      <div className="flex-1 space-y-4 p-8 pt-6 w-full">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Attendees</h2>
          <div className="flex items-center space-x-2">
            <CreateAttendee open={open} onOpenChange={setOpen} eventId={eventId} />
          </div>
        </div>
        <AttendeesTable attendees={attendees} eventId={eventId} />
      </div>
    </MaxWidthWrapper>
  );
}
