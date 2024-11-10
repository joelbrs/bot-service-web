import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import { SubProductDtoOut } from "../../../models";

type Props = {
  subProducts: SubProductDtoOut[];
};

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const SubProductsTable = ({ subProducts }: Props): JSX.Element => {
  return (
    <>
      <section className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-center font-medium">
                Nome do Subproduto
              </TableHead>
              <TableHead className="text-muted-foreground text-center font-medium">
                Preço do Subproduto
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subProducts?.map(({ name, price }) => (
              <TableRow>
                <TableCell className="text-center font-medium">
                  {name}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {moneyFormatter.format(price)}
                </TableCell>
              </TableRow>
            ))}
            {!subProducts?.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center font-medium">
                  Nenhum subproduto adicionado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
