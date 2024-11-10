import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { ChevronDown, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export function BtnUser(): JSX.Element {
  // const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          className="flex items-center justify-center gap-2 h-10"
          variant="outline"
        >
          <h3 className="hidden sm:inline">
            {/* {account?.owner.fullName} */}
          </h3>
          <h3 className="sm:hidden">
            {/* {account?.owner.fullName?.split(" ")[0]} */}
          </h3>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-6 w-56">
        <DropdownMenuLabel className="pb-0">
          {/* {setMaskTaskId(account?.owner.taxId as string)} */}
        </DropdownMenuLabel>
        <p className="text-xs text-muted-foreground px-2">
          {/* {account?.owner.email} */}
        </p>

        <DropdownMenuSeparator className="mt-2" />
        <DropdownMenuItem className="text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
