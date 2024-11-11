import { Outlet } from "react-router-dom";
import { Header } from "../components";
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
        <h1 className="text-3xl font-bold mt-5">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Separator className="mb-5 mt-2" />

        <Outlet />
      </div>

      {/* <Footer /> */}
    </>
  );
};
