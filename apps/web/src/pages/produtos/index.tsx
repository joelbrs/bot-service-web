import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  Input,
  Label,
  Form,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components";
import {
  ProductDtoOut,
  RequestPagination,
  ResponsePagination,
} from "../../models";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnClean } from "../../components/btn-clean";
import { BtnSearch } from "../../components/btn-search";
import { ProductsTable } from "./components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "../../services";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  name: z.string(),
  status: z.enum(["DISPONIVEL", "INDISPONIVEL", ""]),
});

export const ManterProdutos = (): JSX.Element => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: "",
    },
  });

  const [pagination, setPagination] = useState<RequestPagination>(
    new RequestPagination()
  );

  const { data, refetch } = useQuery<ResponsePagination<ProductDtoOut>>({
    queryKey: [
      "products",
      { page: pagination.page, size: pagination.size, ...form.getValues() },
    ],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;
      const result = await ProductApi.getProducts(params as object);
      pagination.totalPages = result.totalPages;

      return result;
    },
  });

  const onSubmit = () => {
    refetch();
  };

  const onClean = () => {
    form.reset();
    refetch();
  };

  const onPaginate = (page: number) => {
    setPagination(new RequestPagination({ ...pagination, page }));
    refetch();
  };

  return (
    <main className="space-y-5">
      <Form {...form}>
        <form
          className="sm:grid sm:grid-cols-12 sm:gap-2 space-y-2 sm:space-y-0"
          onSubmit={() => onSubmit()}
        >
          <section className="sm:col-span-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <FormControl>
                    <Input id="name" placeholder="Nome do Produto" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
          <section className="sm:col-span-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DISPONIVEL">DISPONIVEL</SelectItem>
                      <SelectItem value="INDISPONIVEL">INDISPONIVEL</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </section>
        </form>
      </Form>
      <section className="flex justify-end gap-2">
        <BtnClean onClick={() => onClean()} />
        <BtnSearch onClick={() => onSubmit()} />
      </section>
      <section>
        <ProductsTable
          products={data?.content}
          pagination={pagination}
          onPaginate={onPaginate}
        />
      </section>
    </main>
  );
};
