import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from "@repo/ui/components";
import { Link, useNavigate } from "react-router-dom";
import { BtnLoading, InputPassword } from "../../shared/components";
import { z } from "../../shared/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../../core/services";

type SchemaType = z.infer<typeof schema>;

const schema = z.object({
  cpfCnpj: z.string().min(11).max(14),
  password: z.string().min(8).max(20),
});

export function PasswordSignInPage(): JSX.Element {
  const navigate = useNavigate();

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      cpfCnpj: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async () => {
      const data = await AuthApi.postSignIn(form.getValues());
      navigate("/produtos");
      return data;
    }
  })

  const onSubmit = () => {
    mutate();
  };

  return (
    <div className="space-y-10">
      <Link to={{ pathname: "/" }}>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          Cadastre-se
        </Button>
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Acessar painel
        </h1>
        <p className="text-sm">
          Gerencie seu bot pelo painel do parceiro!
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="space-y-2">
            <FormField
              control={form.control}
              name="cpfCnpj"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                  <FormControl>
                    <Input id="cpfCnpj" placeholder="CPF/CNPJ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputPassword id="password" label="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <div className="flex items-center justify-center mt-5">
            <BtnLoading
              type="submit"
              placeholder="Acessar Painel"
              isLoading={isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
