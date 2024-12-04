import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, { message: "Name is required " }),
  scheduled_at: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
  location: z.string().min(1, { message: "Location is required " }),
});

export type TEventSchema = z.infer<typeof eventSchema>;
