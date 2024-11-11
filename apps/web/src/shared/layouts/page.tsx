import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

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
        <p className="text-sm text-muted-foreground mb-5">{description}</p>

        <Outlet />
      </div>

      <Footer />
    </>
  );
};
