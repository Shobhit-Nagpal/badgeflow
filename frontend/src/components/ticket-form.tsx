"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ticketSchema, TTicketSchema } from "@/schemas/ticket"
import { useCreateTicket } from "@/hooks/use-clerk-query"


interface TicketFormProps {
  initialData?: TTicketSchema
  eventId: string;
}

export function TicketForm({ initialData, eventId }: TicketFormProps) {
  const [isEditing, setIsEditing] = useState(!initialData)

  const form = useForm<TTicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      quantity: 1,
      description: "",
      on_sale: false,
    },
  })

  const { mutateAsync, isPending } = useCreateTicket(eventId);

  async function onSubmit(values: TTicketSchema) {
    await mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Name</FormLabel>
              <FormControl>
                <Input placeholder="VIP, Early Bird, etc." {...field} disabled={!isEditing} />
              </FormControl>
              <FormDescription>The name of this ticket type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} disabled={!isEditing} 
                       onChange={(e) => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>The price of this ticket type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled={!isEditing}
                       onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
              </FormControl>
              <FormDescription>The number of tickets available for this type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Ticket description..." {...field} disabled={!isEditing} />
              </FormControl>
              <FormDescription>A brief description of what this ticket includes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="on_sale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">On Sale</FormLabel>
                <FormDescription>
                  Whether this ticket type is currently available for purchase.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isEditing ? (
          <Button type="submit">{initialData ? "Update Ticket Type" : "Add Ticket Type"}</Button>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>Edit Ticket Type</Button>
        )}
      </form>
    </Form>
  )
}


