import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnSave } from "../../shared/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TemplateApi } from "../../core/services";
import { TemplateStatus } from "../../shared/models";
import { TemplateFormContent } from "./containers";
import { useLocation, useNavigate } from "react-router-dom";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
    name: z.string().min(3),
    content: z.string().optional(),
    status: z.enum(TemplateStatus.values()).default(TemplateStatus.ATIVO),
});

export const EditarTemplate = (): JSX.Element => {
    const form = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            status: TemplateStatus.ATIVO,
        },
    });

    const navigate = useNavigate()
    const { state } = useLocation()

    const { mutate } = useMutation({
        mutationFn: async () => {
            const { id: idenfifier } = state
            const { name, status, content } = form.getValues();

            return await TemplateApi.putTemplate(idenfifier, { name, status, content });
        },
    });

    const onDetail = async () => {
        const { id: idenfifier } = state
        if (!idenfifier) {
            return navigate("/template");
        }

        const { name, status, content } = await TemplateApi.getTemplatebyId(idenfifier);
        form.setValue("name", name);
        form.setValue("status", status);
        form.setValue("content", content)
    }

    const onSubmit = () => {
        mutate();
    };

    useQuery({
        queryKey: ["template"],
        queryFn: onDetail
    })

    return (
        <TemplateFormContent form={form}>
            <section className="flex justify-end gap-2 mt-2">
                <BtnSave onClick={form.handleSubmit(() => onSubmit())} />
            </section>
        </TemplateFormContent>
    );
};
