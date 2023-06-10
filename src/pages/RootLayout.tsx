import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
export const RootLayout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
};
