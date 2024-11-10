import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import { ProductDtoOut, RequestPagination } from "../../../models";
import { PaginationComponent } from "../../../components";

type Props = {
  products?: ProductDtoOut[];
  pagination: RequestPagination;
  onPaginate: (page: number) => void;
};

export const ProductsTable = ({ products, pagination, onPaginate }: Props): JSX.Element => {
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
        <PaginationComponent pagination={pagination} onPaginate={onPaginate}/>
      </section>
    </>
  );
};
