import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "@/index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <div className="p-2 flex gap-2">
          <AppSidebar />
          <SidebarInset>
            <SidebarTrigger className="-ml-1" />
            <Outlet />
          </SidebarInset>
        </div>
        <TanStackRouterDevtools />
      </SidebarProvider>
    </>
  ),
});
