import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, LogOut } from "lucide-react";
import { AuthApi, UserApi } from "../../core/services";
import { UserDtoOut } from "../models";
import { setMaskTaskId } from "../utils";
import { useNavigate } from "react-router-dom";

export function BtnUser(): JSX.Element {
  const navigate = useNavigate();

  const { data } = useQuery<UserDtoOut>({
    queryKey: ["account"],
    queryFn: UserApi.getUser,
  })

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await AuthApi.postLogout();
      navigate("/sign-in");
    }
  })

  const onLogout = () => {
    mutate()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          className="flex items-center justify-center gap-2 h-10"
          variant="outline"
        >
          <h3 className="hidden sm:inline">
            {data?.name}
          </h3>
          <h3 className="sm:hidden">
            {data?.name?.split(" ")[0]}
          </h3>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-6 w-56">
        <DropdownMenuLabel className="pb-0">
          {setMaskTaskId(data?.cpfCnpj as string)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mt-2" />
        <DropdownMenuItem onClick={onLogout} className="text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
