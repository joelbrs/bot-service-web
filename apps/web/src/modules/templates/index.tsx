import { zodResolver } from "@hookform/resolvers/zod";
import {
    RequestPagination,
    ResponsePagination,
    TemplateDtoOut,
    TemplateStatus,
} from "../../shared/models";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnClean, BtnSearch, BtnNew } from "../../shared/components";
import { useQuery } from "@tanstack/react-query";
import { TemplateApi } from "../../core/services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TemplatesTable } from "./components";
import { TemplateForm } from "./containers";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
    name: z.string(),
    status: z.enum(TemplateStatus.values()).default(TemplateStatus.ATIVO),
});

export const ManterTemplate = (): JSX.Element => {
    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            status: TemplateStatus.ATIVO,
        },
    });

    const navigate = useNavigate()

    const [pagination, setPagination] = useState<RequestPagination>(
        new RequestPagination()
    );

    const { data, refetch } = useQuery<ResponsePagination<TemplateDtoOut>>({
        queryKey: [
            "templates",
            { page: pagination.page, size: pagination.size, ...form.getValues() },
        ],
        queryFn: async ({ queryKey }) => {
            const [, params] = queryKey;
            const result = await TemplateApi.getTemplates(params as object);
            pagination.totalPages = result.totalPages;

            return result;
        },
    });

    const onNewProduct = () => {
        navigate('/template/cadastrar')
    }

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
        <TemplateForm form={form}>
            <section className="flex justify-end gap-2">
                <BtnClean onClick={onClean} />
                <BtnSearch onClick={onSubmit} />
                <BtnNew onClick={onNewProduct} label="Novo Template" />
            </section>
            <section>
                <TemplatesTable
                    templates={data?.content}
                    pagination={pagination}
                    onPaginate={onPaginate}
                />
            </section>
        </TemplateForm>
    );
};
