import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnClean, BtnSave } from "../../shared/components";
import { useMutation } from "@tanstack/react-query";
import { TemplateApi } from "../../core/services";
import { TemplateStatus } from "../../shared/models";
import { TemplateFormContent } from "./containers";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
    name: z.string().min(3),
    content: z.string().optional(),
    status: z.enum(TemplateStatus.values()).default(TemplateStatus.ATIVO),
});

export const CadastrarTemplate = (): JSX.Element => {
    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            status: TemplateStatus.ATIVO,
        },
    });

    const { mutate } = useMutation({
        mutationFn: async () => {
            const { name, status, content } = form.getValues();

            return await TemplateApi.postTemplate({ name, status, content });
        },
    });

    const onSubmit = () => {
        mutate();
    };

    const onClean = () => {
        form.reset();
    };

    return (
        <TemplateFormContent form={form}>
            <section className="flex justify-end gap-2 mt-2">
                <BtnClean onClick={() => onClean()} />
                <BtnSave onClick={form.handleSubmit(() => onSubmit())} />
            </section>
        </TemplateFormContent>
    );
};