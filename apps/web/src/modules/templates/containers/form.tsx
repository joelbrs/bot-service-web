import {
    FormControl,
    FormField,
    FormItem,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Form,
    Label,
    FormMessage,
} from "@repo/ui/components";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { TemplateStatus } from "../../../shared/models";

type TemplateFormProps = {
    form: UseFormReturn<
        {
            name: string;
            status: string;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
        undefined
    >;
    children: ReactNode;
};

export const TemplateForm = ({ children, form }: TemplateFormProps) => {
    return (
        <main className="space-y-2">
            <p className="text-muted-foreground">Dados do Produto</p>
            <Form {...form}>
                <form className="sm:grid sm:grid-cols-12 sm:gap-2 space-y-2 sm:space-y-0">
                    <section className="sm:col-span-10">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="name">Título do Template</Label>
                                    <FormControl>
                                        <Input id="name" placeholder="Título do Template" {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <FormMessage />
                                        <SelectContent>
                                            <SelectItem value={TemplateStatus.ATIVO}>{TemplateStatus.ATIVO}</SelectItem>
                                            <SelectItem value={TemplateStatus.INATIVO}>{TemplateStatus.INATIVO}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </section>
                </form>
            </Form>

            {children}
        </main>
    );
};