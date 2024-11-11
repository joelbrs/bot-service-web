import { Separator } from "@repo/ui/components";
import { Pyramid } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./theme-toggle";
import { BtnUser } from "./btn-user";

export function Header(): JSX.Element {
  return (
    <header className="flex justify-between py-3 px-6 border-b">
      <div className="flex items-center">
        <div className="flex items-center gap-6">
          <Pyramid className="w-4 h-4" />
          <Separator className="h-6" orientation="vertical" />
        </div>
        <nav className="sm:px-6 px-2 text-sm font-medium flex sm:gap-3">
          <Link to={{ pathname: "/template" }}>
            <span className="hover:underline hover:underline-offset-4 text-foreground">
              Manter Templates
            </span>
          </Link>
          <Link to={{ pathname: "/produtos" }}>
            <span className="hover:underline hover:underline-offset-4 text-foreground">
              Manter Produtos
            </span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <BtnUser/>
      </div>
    </header>
  );
}