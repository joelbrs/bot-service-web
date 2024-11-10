import { createBrowserRouter } from "react-router-dom";
import { AuthPageLayout } from "./layouts/auth";
import { PasswordSignInPage } from "./pages/sign-in/password-sign-in";
import { SignUpPage } from "./pages/sign-up";
import { NotFoundPage } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPageLayout />,
    children: [
      {
        path: "/",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <PasswordSignInPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
