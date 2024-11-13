import { createBrowserRouter } from "react-router-dom";
import { AuthPageLayout } from "./shared/layouts/auth";
import { PasswordSignInPage } from "./modules/sign-in";
import { SignUpPage } from "./modules/sign-up";
import { NotFoundPage } from "./modules/not-found";
import { ManterProdutos } from "./modules/produtos";
import { Page } from "./shared/layouts/page";
import { CadastrarProduto } from "./modules/produtos/cadastrar";
import { EditarProduto } from "./modules/produtos/editar";
import { ManterTemplate } from "./modules/templates";
import { CadastrarTemplate } from "./modules/templates/cadastrar";
import { EditarTemplate } from "./modules/templates/editar";

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
    element: <Page title="Manter Produtos" />,
    children: [
      {
        path: '/produtos',
        element: <ManterProdutos />
      }
    ]
  },
  {
    path: '/',
    element: <Page title="Novo Produto" />,
    children: [
      {
        path: '/produtos/cadastrar',
        element: <CadastrarProduto />
      }
    ]
  },
  {
    path: '/',
    element: <Page title="Editar Produto" />,
    children: [
      {
        path: '/produtos/editar/:id',
        element: <EditarProduto />
      }
    ]
  },
  {
    path: '/',
    element: <Page title="Manter Templates" />,
    children: [
      {
        path: '/template',
        element: <ManterTemplate />
      }
    ]
  },
  {
    path: '/',
    element: <Page title="Novo Template" />,
    children: [
      {
        path: '/template/cadastrar',
        element: <CadastrarTemplate />
      }
    ]
  },
  {
    path: '/',
    element: <Page title="Editar Template" />,
    children: [
      {
        path: '/template/editar/:id',
        element: <EditarTemplate />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
