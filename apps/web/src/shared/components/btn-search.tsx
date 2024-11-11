import { Button } from "@repo/ui/components";
import { Search } from "lucide-react";

type Props = {
  onClick?: () => void;
};

export const BtnSearch = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} className="bg-sky-400 hover:bg-sky-500 font-bold" size="sm">
      Consultar
      <Search className="w-5 h-5 ml-1" />
    </Button>
  );
};
