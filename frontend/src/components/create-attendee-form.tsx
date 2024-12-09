import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import {
  useCreateEventAttendee,
} from "@/hooks/use-clerk-query";
import { Dispatch, SetStateAction } from "react";
import { eventAttendeeSchema, TEventAttendeeSchema } from "@/schemas/event-attendee";
import { Loader } from "./ui/loader";

type CreateAttendeeFormProps = {
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  eventId: string;
};

export function CreateAttendeeForm({
  eventId,
  onOpenChange,
}: CreateAttendeeFormProps) {
  const form = useForm<TEventAttendeeSchema>({
    resolver: zodResolver(eventAttendeeSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const { mutateAsync, isPending } = useCreateEventAttendee(eventId);

  async function onSubmit(values: TEventAttendeeSchema) {
    await mutateAsync(values);
    onOpenChange(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 py-4">
          <div className="flex flex-col justify-center gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Attendee Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="attendee@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </span>
            ) : (
              <span>Add Attendee</span>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
