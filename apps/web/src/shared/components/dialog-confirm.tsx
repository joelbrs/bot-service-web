import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@repo/ui/components";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
    description: string;
    children: ReactNode;
    onConfirm: () => void;
    isLoading: boolean
    refetch?: () => void
};

export function DialogConfirm({
    description,
    onConfirm,
    children,
    isLoading,
    refetch
}: Props): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen(true)} asChild>{children}</DialogTrigger>
            <DialogContent className="sm:min-h-[130px] sm:max-w-[380px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Confirmação</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose onClick={() => setOpen(false)} disabled={isLoading} asChild>
                        <Button className="h-8" variant="outline">
                            Não
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => {
                            onConfirm()
                            setOpen(false)
                            refetch && refetch()
                        }}
                        className="h-8"
                        variant="outline"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        Sim
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}