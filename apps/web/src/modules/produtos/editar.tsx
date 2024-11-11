import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnSave } from "../../shared/components";
import { SubProductsTable } from "./components";
import { ProductForm, SubProductForm } from "./containers";
import { useState } from "react";
import { ProductStatus, SubProductDtoOut } from "../../shared/models";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductApi } from "../../core/services";
import { useLocation, useNavigate } from "react-router-dom";
import { BtnBack } from "../../shared/components/btn-back";

type SchemaType = z.infer<typeof schema>;
type SubProductSchemaType = z.infer<typeof schemaSubProduct>;

const schema = z.object({
    name: z.string().min(3),
    status: z.enum(ProductStatus.values()).default(ProductStatus.DISPONIVEL),
});

const schemaSubProduct = z.object({
    name: z.string().min(3),
    price: z.number().positive({
        message: "O valor deverá ser maior que R$ 0,00",
    }),
});

export const EditarProduto = (): JSX.Element => {
    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            status: ProductStatus.DISPONIVEL,
        },
    });

    const formSubProduct = useForm<SubProductSchemaType>({
        resolver: zodResolver(schemaSubProduct),
        defaultValues: {
            name: "",
            price: 0,
        },
    });

    const navigate = useNavigate()
    const { state } = useLocation()

    const [subProducts, setSubProducts] = useState<SubProductDtoOut[]>([]);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const { id: idenfifier } = state
            const { name, status } = form.getValues();

            return await ProductApi.putProduct(idenfifier, { name, status, products: subProducts });
        },
    });

    const onDetail = async () => {
        const { id: idenfifier } = state
        if (!idenfifier) {
            return navigate("/produtos");
        }

        const { name, status, subProducts } = await ProductApi.getProductById(idenfifier);
        form.setValue("name", name);
        form.setValue("status", status);
        setSubProducts(subProducts);
    }

    const onAddSubProduct = ({ name, price }: SubProductDtoOut) => {
        subProducts.push({ name, price });
        formSubProduct.reset();
    };

    const onSubmit = () => {
        mutate();
        navigate("/produtos")
    };


    useQuery({
        queryKey: ["product"],
        queryFn: onDetail
    })

    return (
        <ProductForm form={form}>
            <section className="space-y-2">
                <p className="text-muted-foreground pt-5">Dados dos Subprodutos</p>
                <SubProductForm form={formSubProduct} onSubmit={onAddSubProduct}>
                    <SubProductsTable subProducts={subProducts} />
                </SubProductForm>
            </section>

            <section className="flex justify-between">
                <BtnBack />
                <BtnSave onClick={form.handleSubmit(() => onSubmit())} />
            </section>
        </ProductForm>
    );
};
