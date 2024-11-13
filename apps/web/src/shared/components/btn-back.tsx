import { Button } from "@repo/ui/components";
import { CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BtnBack = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Button onClick={goBack} className="bg-gray-400 hover:bg-gray-500 font-bold" size="sm">
            Voltar
            <CornerDownLeft className="w-5 h-5 ml-1" />
        </Button>
    );
};
