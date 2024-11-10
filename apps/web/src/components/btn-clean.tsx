import { Button } from "@repo/ui/components";
import { Eraser } from "lucide-react";

export type Props = {
  onClick?: () => void;
};

export const BtnClean = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} className="bg-yellow-400 hover:bg-yellow-500 font-bold">
      Limpar
      <Eraser className="w-5 h-5 ml-1" />
    </Button>
  );
};