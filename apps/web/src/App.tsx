import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LoadingSpinner, ThemeProvider } from "./shared/components";
import { Toaster } from "@repo/ui/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<LoadingSpinner />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster closeButton richColors />
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
