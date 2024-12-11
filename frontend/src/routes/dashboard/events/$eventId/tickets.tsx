import { createFileRoute } from "@tanstack/react-router";
import { TicketForm } from "@/components/ticket-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, DollarSign, Ticket, Users } from "lucide-react";
import { useGetTickets } from "@/hooks/use-clerk-query";
import { Loader } from "@/components/ui/loader";
import { TTicketSchema } from "@/schemas/ticket";

export const Route = createFileRoute("/dashboard/events/$eventId/tickets")({
  component: TicketingPage,
});

function TicketingPage() {
  const { eventId } = Route.useParams();
  const { data: tickets, isError, isLoading } = useGetTickets(eventId);

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <Loader size="lg" text="Loading attendees..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Something went wrong. Please refresh the page.</p>
      </div>
    );
  }

  if (!tickets) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Metrics is null.</p>
      </div>
    );
  }

  console.log(tickets);

  const totalRevenue = tickets.reduce((sum, tt) => sum + +tt.price, 0);
  const totalSold = tickets.reduce((sum) => sum, 0);
  const totalAvailable = tickets.reduce((sum, tt) => sum + tt.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Event Ticketing</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSold}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Tickets
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAvailable}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Types</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage">Manage Tickets</TabsTrigger>
          <TabsTrigger value="add">Add New Ticket Type</TabsTrigger>
        </TabsList>
        <TabsContent value="manage" className="space-y-4">
          {tickets.map((ticket) => {
            const data: TTicketSchema = {
              name: ticket.name,
              description: ticket.description?.String,
              price: +ticket.price,
              quantity: ticket.quantity,
              on_sale: ticket.on_sale,
            };

            return (
              <Card key={ticket.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {ticket.name}
                    <Badge variant={ticket.on_sale ? "default" : "secondary"}>
                      {ticket.on_sale ? "On Sale" : "Off Sale"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    ${(+ticket.price).toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {ticket.description?.String}
                  </p>
                  <div className="flex justify-between items-center">
                    <span>
                      Sold: {ticket.quantity} / {ticket.quantity}
                    </span>
                    <TicketForm initialData={data} eventId={eventId} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Ticket Type</CardTitle>
            </CardHeader>
            <CardContent>
              <TicketForm eventId={eventId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
