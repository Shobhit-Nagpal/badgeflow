"use client";

import * as React from "react";
import { Calendar, PieChart, Users, Ticket, Settings2 } from "lucide-react";
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

const navMain = [
  {
    title: "Events",
    url: "/events",
    icon: Calendar, // Using Lucide icon
    items: [
      {
        title: "All Events",
        url: "/events/all",
      },
      {
        title: "Upcoming",
        url: "/events/upcoming",
      },
      {
        title: "Past Events",
        url: "/events/past",
      },
      {
        title: "Templates",
        url: "/events/templates",
      },
    ],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: PieChart,
    items: [
      {
        title: "Dashboard",
        url: "/analytics/dashboard",
      },
      {
        title: "Revenue",
        url: "/analytics/revenue",
      },
      {
        title: "Attendance",
        url: "/analytics/attendance",
      },
    ],
  },
  {
    title: "Attendees",
    url: "/attendees",
    icon: Users, // Lucide icon
    items: [
      {
        title: "Directory",
        url: "/attendees/directory",
      },
      {
        title: "Check-in",
        url: "/attendees/check-in",
      },
      {
        title: "Communications",
        url: "/attendees/communications",
      },
    ],
  },
  {
    title: "Ticketing",
    url: "/tickets",
    icon: Ticket, // Lucide icon
    items: [
      {
        title: "Ticket Types",
        url: "/tickets/types",
      },
      {
        title: "Pricing",
        url: "/tickets/pricing",
      },
      {
        title: "Orders",
        url: "/tickets/orders",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    items: [
      {
        title: "Organization",
        url: "/settings/organization",
      },
      {
        title: "Team",
        url: "/settings/team",
      },
      {
        title: "Billing",
        url: "/settings/billing",
      },
      {
        title: "Integrations",
        url: "/settings/integrations",
      },
    ],
  },
];

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user?: UserResource | null;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
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
