import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { eventSchema, TEventSchema } from "@/schemas/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, Loader } from "lucide-react";
import { DialogFooter } from "./ui/dialog";
import { useCreateEvent } from "@/hooks/use-clerk-query";
import { Dispatch, SetStateAction } from "react";

type CreateEventFormProps = {
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function CreateEventForm({ onOpenChange }: CreateEventFormProps) {
  const form = useForm<TEventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      scheduled_at: new Date(),
    },
  });
  const { mutateAsync, isPending } = useCreateEvent();

  async function onSubmit(values: TEventSchema) {
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
                    <Input placeholder="New event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <FormField
              control={form.control}
              name="scheduled_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Scheduled At</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
              <span>
                <Loader className="h-4 w-4 mr-2" />
                Creating...
              </span>
            ) : (
              <span>Create Event</span>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
