import { AppSidebar } from "@/components/app-sidebar";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/$eventId")({
  component: () => {
    const { eventId } = Route.useParams();
    const { user } = useUser();

    return (
      <SidebarProvider>
        <div className="p-2 flex gap-2 w-full">
          <AppSidebar user={user} eventId={eventId} />
          <SidebarInset>
            <SidebarTrigger className="-ml-1" />
            <MaxWidthWrapper>
              <Outlet />
            </MaxWidthWrapper>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  },
});
