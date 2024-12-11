import * as z from "zod"

export const ticketSchema = z.object({
  name: z.string().min(2, {
    message: "Ticket name must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  quantity: z.number().int().min(1, {
    message: "Quantity must be at least 1.",
  }),
  description: z.string().optional(),
  on_sale: z.boolean().default(true),
})

export type TTicketSchema = z.infer<typeof ticketSchema>
