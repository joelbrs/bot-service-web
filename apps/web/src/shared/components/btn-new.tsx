import { Button } from "@repo/ui/components";
import { Plus } from "lucide-react";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  className?: string;
};

export const BtnNew = ({ label, onClick, type, className }: Props) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} "font-bold bg-green-400 hover:bg-green-500 text-white`}
      type={type}
      size="sm"
    >
      {label}
      <Plus className="w-5 h-5 ml-1" />
    </Button>
  );
};
