import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BtnClean, BtnSave } from "../../shared/components";
import { useMutation } from "@tanstack/react-query";
import { TemplateApi } from "../../core/services";
import { TemplateStatus } from "../../shared/models";
import { TemplateFormContent } from "./containers";
import { useNavigate } from "react-router-dom";
import { BtnBack } from "../../shared/components/btn-back";
import { DialogConfirm } from "../../shared/components/dialog-confirm";
import { useState } from "react";

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

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { name, status, content } = form.getValues();

            return await TemplateApi.postTemplate({ name, status, content });
        },
    });

    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const onVerify = () => {
        const { status } = form.getValues();

        if (status === TemplateStatus.ATIVO) {
            return setOpen(true);
        }
        onSubmit();
    }

    const onSubmit = () => {
        mutate();
        navigate("/template");
    };

    const onClean = () => {
        form.reset();
    };

    return (
        <TemplateFormContent form={form}>
            <DialogConfirm open={open} setOpen={setOpen} description="Ao criar um template com o status ATIVO, este será o que será retornado aos usuários." onConfirm={onSubmit} isLoading={isPending} />

            <section className="flex justify-between mt-2">
                <BtnBack />

                <div className="flex gap-2">
                    <BtnClean onClick={() => onClean()} />
                    <BtnSave onClick={form.handleSubmit(() => onVerify())} />
                </div>
            </section>
        </TemplateFormContent>
    );
};
