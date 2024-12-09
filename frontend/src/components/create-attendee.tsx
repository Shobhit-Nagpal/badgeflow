import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { CreateAttendeeForm } from "./create-attendee-form";

type CreateAttendeeProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  eventId: string;
};

export function CreateAttendee({
  eventId,
  open,
  onOpenChange,
}: CreateAttendeeProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Users className="mr-2 h-4 w-4" />
          Add Attendee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Enter the details of the attendee. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateAttendeeForm onOpenChange={onOpenChange} eventId={eventId} />
      </DialogContent>
    </Dialog>
  );
}
