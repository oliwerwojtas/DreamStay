import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Details, Offers } from "./pages/details/Details";
import { Settings } from "./pages/settings/Settings";
import { Create } from "./pages/create/Create";
import { RootLayout } from "./pages/RootLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditDocument } from "./pages/edit/EditDocument";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
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
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/create",
        element: (
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <EditDocument />
          </PrivateRoute>
        ),
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
