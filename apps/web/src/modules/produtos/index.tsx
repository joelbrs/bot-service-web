import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductDtoOut,
  ProductStatus,
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
import { useNavigate } from "react-router-dom";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  name: z.string(),
  status: z.enum(ProductStatus.values()).default(ProductStatus.DISPONIVEL),
});

export const ManterProdutos = (): JSX.Element => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: ProductStatus.DISPONIVEL,
    },
  });

  const navigate = useNavigate()

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
      pagination.totalElements = result.totalElements;

      return result;
    },
  });

  const onNewProduct = () => {
    navigate('/produtos/cadastrar')
  }

  const onSubmit = () => {
    refetch();
  };

  const onClean = () => {
    form.reset();
    setPagination(new RequestPagination());
    refetch();
  };

  const onPaginate = (page: number) => {
    setPagination(new RequestPagination({ ...pagination, page }));
    refetch();
  };

  return (
    <ProductForm form={form}>
      <section className="flex justify-end gap-2">
        <BtnClean onClick={onClean} />
        <BtnSearch onClick={onSubmit} />
        <BtnNew onClick={onNewProduct} label="Novo Produto" />
      </section>
      <section>
        <ProductsTable
          products={data?.content}
          pagination={pagination}
          onPaginate={onPaginate}
          refetch={refetch}
        />
      </section>
    </ProductForm>
  );
};
