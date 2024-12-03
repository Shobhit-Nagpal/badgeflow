import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { CreateEventForm } from "./create-event-form";

type CreateEventProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function CreateEvent({ open, onOpenChange }: CreateEventProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <CalendarPlus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Enter the details for your new event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateEventForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
