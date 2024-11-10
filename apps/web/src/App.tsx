import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LoadingSpinner, ThemeProvider } from "./components";
import { Toaster } from "@repo/ui/components";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
        <Toaster closeButton richColors />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
