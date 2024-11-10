import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

type Props = {
  title: string;
  description?: string;
};

export const Page = ({ title, description }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <div className="sm:px-10 px-5">
        <h1 className="text-2xl font-bold mt-10">{title}</h1>
        <p className="text-sm text-muted-foreground mb-5">{description}</p>

        <Outlet />
      </div>

      <Footer />
    </>
  );
};
