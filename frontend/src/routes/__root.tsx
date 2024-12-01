import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "@/index.css";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";

interface MyRouterContext {
  auth?: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
