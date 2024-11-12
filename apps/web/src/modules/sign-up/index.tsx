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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../../core/services";

type SchemaType = z.infer<typeof schema>;

const schema = z
  .object({
    cpfCnpj: z.string().min(11),
    name: z.string().min(3),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas deverão ser iguais.",
    path: ["passwordConfirmation"],
  });

export function SignUpPage(): JSX.Element {
  const navigate = useNavigate()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      cpfCnpj: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async () => {
      await AuthApi.postSignUp(form.getValues());
      navigate("/sign-in");
    }
  })

  const onSubmit = () => {
    mutate()
  };

  return (
    <div className="lg:p-8 space-y-10">
      <Link to={{ pathname: "/sign-in" }}>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          Login
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm">
            Seja um parceiro <span className="font-semibold">Bot</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="cpfCnpj"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                  <FormControl>
                    <Input placeholder="CPF/CNPJ" id="cpfCnpj" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Nome</Label>
                  <FormControl>
                    <Input placeholder="Nome" id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputPassword
                        label="Senha"
                        id="password"
                        maxLength={20}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputPassword
                        label="Confirme a Senha"
                        id="passwordConfirmation"
                        maxLength={20}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <BtnLoading
              type="submit"
              placeholder="Finalizar Cadastro"
              isLoading={isPending}
            />
          </form>
        </Form>

        <p className="px-6 text-center text-sm leading-relaxed">
          Ao continuar, você concorda com nossos{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de serviço
          </a>{" "}
          e{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Políticas de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
