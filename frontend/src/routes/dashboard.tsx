import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    const token = await context.auth?.getToken();
    if (!token) {
      redirect({
        to: "/",
        throw: true,
      });
    }
  },
  component: () => {
    const { user } = useUser();

    return (
      <SidebarProvider>
        <div className="p-2 flex gap-2 w-full">
          <AppSidebar user={user} />
          <SidebarInset>
            <SidebarTrigger className="-ml-1" />
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  },
});
