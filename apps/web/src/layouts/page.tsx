import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const Page = (): JSX.Element => {
    return (
        <>
          <Header />
          <div className="sm:px-10">
            <Outlet />
          </div>
  
          <Footer />
        </>
      );
}