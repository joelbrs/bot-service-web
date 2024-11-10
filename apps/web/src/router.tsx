import { createBrowserRouter } from "react-router-dom";
import { AuthPageLayout } from "./layouts/auth";
import { PasswordSignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { NotFoundPage } from "./pages/not-found";
import { ManterProdutos } from "./pages/produtos";
import { Page } from "./layouts/page";
import { CadastrarProduto } from "./pages/produtos/cadastrar";

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
    path: '/',
    element: <Page title="Manter Produtos"/>,
    children: [
      {
        path: '/produtos',
        element: <ManterProdutos />
      }
    ]
  },
  {
    path: '/',
    element: <Page title="Novo Produto"/>,
    children: [
      {
        path: '/produtos/cadastrar',
        element: <CadastrarProduto />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
