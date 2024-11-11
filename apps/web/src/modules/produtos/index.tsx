import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductDtoOut,
  RequestPagination,
  ResponsePagination,
} from "../../shared/models";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnClean, BtnSearch, BtnNew } from "../../shared/components";
import { ProductsTable } from "./components";
import { ProductForm } from "./containers";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "../../core/services";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  name: z.string(),
  status: z.enum(["DISPONIVEL", "INDISPONIVEL"]),
});

export const ManterProdutos = (): JSX.Element => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: "DISPONIVEL",
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
    <ProductForm form={form}>
      <section className="flex justify-end gap-2">
        <BtnClean onClick={() => onClean()} />
        <BtnSearch onClick={() => onSubmit()} />
        <BtnNew onClick={() => onSubmit()} label="Novo Produto" />
      </section>
      <section>
        <ProductsTable
          products={data?.content}
          pagination={pagination}
          onPaginate={onPaginate}
        />
      </section>
    </ProductForm>
  );
};
