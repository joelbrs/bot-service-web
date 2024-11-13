import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui/components";
import { RequestPagination, TemplateDtoOut } from "../../../shared/models";
import { PaginationComponent, TooltipContainer } from "../../../shared/components";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DialogConfirm } from "../../../shared/components/dialog-confirm";
import { useMutation } from "@tanstack/react-query";
import { TemplateApi } from "../../../core/services";
import { useState } from "react";

type Props = {
    templates?: TemplateDtoOut[];
    pagination: RequestPagination;
    onPaginate: (page: number) => void;
    refetch: () => void;
};

export const TemplatesTable = ({ templates, pagination, onPaginate, refetch }: Props): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate()

    const onEdit = ({ id }: TemplateDtoOut) => {
        navigate(`/template/editar/${id}`, { state: { id } })
    }

    const { isPending, mutate: onExclude } = useMutation({
        mutationKey: ["deleteProduct"],
        mutationFn: async ({ id }: TemplateDtoOut) => {
            await TemplateApi.deleteTemplate(id);
        }
    })

    return (
        <>
            <section className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-muted-foreground text-center font-medium">
                                Título do Template
                            </TableHead>
                            <TableHead className="text-muted-foreground text-center font-medium">
                                Status
                            </TableHead>
                            <TableHead className="text-muted-foreground text-center font-medium">
                                Ações
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates?.map(({ id, name, status, content }) => (
                            <TableRow key={id}>
                                <TableCell className="text-center font-medium">
                                    {name}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {status}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    <TooltipContainer label="Editar">
                                        <Button size="icon" variant="ghost" onClick={() => onEdit({ id, name, status, content })}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </TooltipContainer>
                                    <TooltipContainer label="Excluir">
                                        <DialogConfirm open={open} setOpen={setOpen} isLoading={isPending} onConfirm={() => onExclude({ id, name, status, content })} refetch={refetch} description="Tem certeza que deseja excluir esse item?">
                                            <Button size="icon" variant="ghost">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </DialogConfirm>
                                    </TooltipContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!templates?.length && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center font-medium">
                                    Nenhum template encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </section >
            <section className="mt-2">
                <PaginationComponent pagination={pagination} onPaginate={onPaginate} />
            </section>
        </>
    );
};
