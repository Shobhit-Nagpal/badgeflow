import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuth } from "@clerk/clerk-react";

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}
