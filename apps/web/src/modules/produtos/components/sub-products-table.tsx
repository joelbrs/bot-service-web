import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import { SubProductDtoOut } from "../../../shared/models";
import { TooltipContainer } from "../../../shared/components";
import { Trash } from "lucide-react";
import { useState } from "react";

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
  const [key, setKey] = useState<number>(0)

  const onExclude = (index: number) => {
    subProducts.splice(index, 1);
    setKey(key + 1)
  }

  return (
    <>
      <section className="border rounded-md">
        <Table key={key}>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-center font-medium">
                Nome do Subproduto
              </TableHead>
              <TableHead className="text-muted-foreground text-center font-medium">
                Preço do Subproduto
              </TableHead>
              <TableHead className="text-muted-foreground text-center font-medium">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subProducts?.map(({ name, price }, i) => (
              <TableRow>
                <TableCell className="text-center font-medium">
                  {name}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {moneyFormatter.format(price)}
                </TableCell>
                <TableCell className="text-center font-medium">
                  <TooltipContainer label="Excluir">
                    <Button size="icon" variant="ghost" onClick={() => onExclude(i)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TooltipContainer>
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
