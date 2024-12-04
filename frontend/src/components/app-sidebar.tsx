"use client";

import * as React from "react";
import { Calendar, PieChart, Users, Ticket, LayoutDashboard } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { UserResource } from "@clerk/types";


type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  eventId: string;
  user?: UserResource | null;
};

export function AppSidebar({ user, eventId , ...props }: AppSidebarProps) {
const navMain = [
  {
    title: "Events",
    url: `/dashboard/events/${eventId}`,
    icon: Calendar, // Using Lucide icon
  },
  {
    title: "Analytics",
    url: `/dashboard/events/${eventId}/analytics`,
    icon: PieChart,
  },
  {
    title: "Attendees",
    url: `/dashboard/events/${eventId}/attendees`,
    icon: Users, // Lucide icon
  },
  {
    title: "Ticketing",
    url: `/dashboard/events/${eventId}/tickets`,
    icon: Ticket, // Lucide icon
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard, // Lucide icon
  },
];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
