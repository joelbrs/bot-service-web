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

type Props = {
    templates?: TemplateDtoOut[];
    pagination: RequestPagination;
    onPaginate: (page: number) => void;
};

export const TemplatesTable = ({ templates, pagination, onPaginate }: Props): JSX.Element => {
    const navigate = useNavigate()

    const onEdit = ({ id }: TemplateDtoOut) => {
        navigate(`/template/editar/${id}`, { state: { id } })
    }

    const onExclude = () => { }

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
                        {templates?.map(({ id, name, status }) => (
                            <TableRow key={id}>
                                <TableCell className="text-center font-medium">
                                    {name}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {status}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    <TooltipContainer label="Editar">
                                        <Button size="icon" variant="ghost" onClick={() => onEdit({ id, name, status })}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </TooltipContainer>
                                    <TooltipContainer label="Excluir">
                                        <Button size="icon" variant="ghost" onClick={onExclude}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
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
            </section>
            <section className="mt-2">
                <PaginationComponent pagination={pagination} onPaginate={onPaginate} />
            </section>
        </>
    );
};
