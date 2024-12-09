import { z } from "zod";

export const eventAttendeeSchema = z.object({
  name: z.string().min(1, { message: "Name is required " }),
  email: z.string().email().min(1, { message: "Email is required " }),
});

export type TEventAttendeeSchema = z.infer<typeof eventAttendeeSchema>;
