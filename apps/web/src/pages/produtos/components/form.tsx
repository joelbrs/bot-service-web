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
import { InputMoney, BtnNew } from "../../../components";
import { SubProductDtoOut } from "../../../models";

type ProductFormProps = {
  form: UseFormReturn<
    {
      name: string;
      status: "DISPONIVEL" | "INDISPONIVEL";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  children: ReactNode;
};

type SubProductFormProps = {
  form: UseFormReturn<
    {
      name: string;
      price: number;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  children: ReactNode;
  onSubmit: (data: SubProductDtoOut) => void;
};

export const ProductForm = ({ children, form }: ProductFormProps) => {
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
                  <Label htmlFor="name">Nome do Produto</Label>
                  <FormControl>
                    <Input id="name" placeholder="Nome do Produto" {...field} />
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

      {children}
    </main>
  );
};

export const SubProductForm = ({
  form,
  children,
  onSubmit,
}: SubProductFormProps) => {
  return (
    <main className="space-y-5">
      <Form {...form}>
        <form
          className="sm:grid sm:grid-cols-12 sm:gap-2 space-y-2 sm:space-y-0"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
        >
          <section className="sm:col-span-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <FormControl>
                    <Input id="name" placeholder="Nome do Produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="sm:col-span-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputMoney
                      form={form}
                      label="Preço do Produto"
                      placeholder="Preço do Produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
          <section className="sm:col-span-2 pt-8">
            <BtnNew label="Adicionar" type="submit" className="w-full" />
          </section>
        </form>
      </Form>
      {children}
    </main>
  );
};
