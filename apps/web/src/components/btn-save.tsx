import { Button } from "@repo/ui/components";
import { Save } from "lucide-react";

type Props = {
  onClick?: () => void;
};

export const BtnSave = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} className="font-bold">
      Salvar
      <Save className="w-5 h-5 ml-1" />
    </Button>
  );
};
