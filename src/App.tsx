import "./App.css";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import { Offers } from "./pages/offers/Offers";
import { Settings } from "./pages/settings/Settings.js";
import { RootLayout } from "./pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAuthContext } from "../src/context/useAuthContext.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
