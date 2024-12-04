import { TEvent } from "@/types"
import { Event } from "./event"

type EventsProps = {
  events: TEvent[];
}

export function Events({ events }: EventsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </div>
  )
}


