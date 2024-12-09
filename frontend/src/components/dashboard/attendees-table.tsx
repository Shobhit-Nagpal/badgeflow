"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "../empty-state";
import { CreateAttendee } from "../create-attendee";
import { TEventAttendee } from "@/types";

interface AttendeesTableProps {
  eventId: string;
  attendees: TEventAttendee[];
}

export function AttendeesTable({ eventId, attendees }: AttendeesTableProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<keyof TEventAttendee>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleSort = (column: keyof TEventAttendee) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (attendees.length === 0) {
    return (
      <EmptyState
        title="No attendees added"
        description="Get started by adding your first attendee"
        action={
          <CreateAttendee
            open={open}
            onOpenChange={setOpen}
            eventId={eventId}
          />
        }
      />
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => toggleSort("name")}
              className="cursor-pointer"
            >
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("email")}
              className="cursor-pointer"
            >
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("status")}
              className="cursor-pointer"
            >
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>{attendee.name}</TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    attendee.status === "confirmed"
                      ? "default"
                      : attendee.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {attendee.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(attendee.id)}
                    >
                      Copy email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
