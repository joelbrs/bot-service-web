import { AxiosError } from "axios";
import { toast } from "sonner";

export const notifySuccess = () => {
  toast.success("Sucesso!", {
    description: "Operação realizada com sucesso.",
    duration: 1500,
  });
};

export const notifyError = (e: AxiosError) => {
  const { response } = e;

  if (response?.status === 500) {
    return toast.error("Oops! Algo deu errado.", {
      description:
        "Verifique sua conexão com a internet e tente novamente mais tarde.",
      duration: 1500,
    });
  }

  toast.warning("Atenção!", {
    description: e?.message,
    duration: 1500,
  });
};
