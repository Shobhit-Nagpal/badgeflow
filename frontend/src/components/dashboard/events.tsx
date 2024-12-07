import { TEvent } from "@/types";
import { Event } from "./event";
import { EmptyState } from "../empty-state";
import { CreateEvent } from "../create-event";
import { useState } from "react";

type EventsProps = {
  events: TEvent[];
};

export function Events({ events }: EventsProps) {
  const [open, setOpen] = useState(false);
  if (events.length === 0) {
    return (
      <EmptyState
        title="No events created yet"
        description="Get started by creating your first event"
        action={<CreateEvent open={open} onOpenChange={setOpen} />}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </div>
  );
}
