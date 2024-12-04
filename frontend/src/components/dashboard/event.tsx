import { CalendarDays, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TEvent } from "@/types";
import { format } from "date-fns";

type EventProps = TEvent;

export function Event({ scheduled_at, event_name, location }: EventProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="truncate">{event_name}</span>
          <Badge variant="secondary">Upcoming</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">
              {format(scheduled_at, "dd/mm/yyyy")}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">50 attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
