import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuth } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />;
    </QueryClientProvider>
  );
}
