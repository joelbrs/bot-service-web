import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import { ProductDtoOut, RequestPagination } from "../../../shared/models";
import { PaginationComponent, TooltipContainer } from "../../../shared/components";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  products?: ProductDtoOut[];
  pagination: RequestPagination;
  onPaginate: (page: number) => void;
};

export const ProductsTable = ({ products, pagination, onPaginate }: Props): JSX.Element => {
  const navigate = useNavigate()

  const onEdit = () => {
    navigate('/produtos/editar')
  }

  const onExclude = () => { }

  return (
    <>
      <section className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-center font-medium">
                Nome do Produto
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
            {products?.map(({ id, name, status }) => (
              <TableRow key={id}>
                <TableCell className="text-center font-medium">
                  {name}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {status}
                </TableCell>
                <TableCell className="text-center font-medium">
                  <TooltipContainer label="Editar">
                    <Button size="icon" variant="ghost" onClick={onEdit}>
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
            {!products?.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-medium">
                  Nenhum produto encontrado
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
