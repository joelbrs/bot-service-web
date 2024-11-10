import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

type Props = {
  title: string;
};

export const Page = ({ title }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <div className="sm:px-10">
        <h1 className="text-2xl font-bold mt-10">{title}</h1>

        <Outlet />
      </div>

      <Footer />
    </>
  );
};
