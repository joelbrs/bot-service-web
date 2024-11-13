import { Separator } from "@repo/ui/components";
import { BotMessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BtnUser } from "./btn-user";

export function Header(): JSX.Element {
  const { pathname } = useLocation()

  const isTemplatePage = () => {
    const [, uri] = pathname.split('/')
    console.log(uri)
    return uri === 'template'
  }

  const isProductPage = () => {
    const [, uri] = pathname.split('/')
    return uri === 'produtos'
  }

  return (
    <header className="flex justify-between py-3 px-6 border-b">
      <div className="flex items-center">
        <div className="flex items-center gap-6">
          <BotMessageSquare className="w-5 h-5" />
          <Separator className="h-6" orientation="vertical" />
        </div>
        <nav className="sm:px-6 px-2 text-sm font-medium flex sm:gap-3">
          <Link to={{ pathname: "/template" }}>
            <span className={`hover:underline hover:underline-offset-4 text-foreground ${isTemplatePage() && 'underline underline-offset-4'}`}>
              Manter Templates
            </span>
          </Link>
          <Link to={{ pathname: "/produtos" }}>
            <span className={`hover:underline hover:underline-offset-4 text-foreground ${isProductPage() && 'underline underline-offset-4'}`}>
              Manter Produtos
            </span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {/* <ModeToggle /> */}
        <BtnUser />
      </div>
    </header>
  );
}
