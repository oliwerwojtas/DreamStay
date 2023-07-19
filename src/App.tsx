import { PrivateRoute } from "./components/shared/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditDocument } from "./pages/edit/EditDocument";
import { ForgotPassword } from "./pages/forgotPassword/ForgotPassword";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/shared/Spinner";

const Home = lazy(() => import("./pages/home/Home"));
const Welcome = lazy(() => import("./pages/welcome/Welcome"));
const Login = lazy(() => import("./pages/login/Login"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const Details = lazy(() => import("./pages/details/Details"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Create = lazy(() => import("./pages/create/Create"));
const RootLayout = lazy(() => import("./pages/RootLayout"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/welcome",
        element: (
          <Suspense fallback={<Spinner />}>
            <Welcome />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Spinner />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/forgotPassword",
        element: (
          <Suspense fallback={<Spinner />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Spinner />}>
              <Details />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/create",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Spinner />}>
              <Create />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Spinner />}>
              <Settings />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Spinner />}>
              <EditDocument />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
const App = () => {
  return (
    <div className="dark:bg-red-500">
      <ToastContainer theme="dark" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
