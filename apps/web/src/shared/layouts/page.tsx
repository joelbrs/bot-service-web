import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";
import { Separator } from "@repo/ui/components";

type Props = {
  title: string;
  description?: string;
};

export const Page = ({ title, description }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <div className="sm:px-10 px-5">
        <h1 className="text-3xl font-bold mt-8">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Separator className="mb-5 mt-3" />

        <Outlet />
      </div>

      <Footer />
    </>
  );
};
