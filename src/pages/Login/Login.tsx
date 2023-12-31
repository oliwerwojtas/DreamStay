import { useRef } from "react";
import { useLogin } from "../../hooks/useLogin";
//components
import { MediaAuthGoogle } from "../../components/auth/GoogleAuth";
import { MediaAuthGithub } from "../../components/auth/GithubAuth";
import { Button } from "../../components/shared/Button";
//utilities
import { Link } from "react-router-dom";
import { LoginData } from "../../types/auth/auth.ts";
import { toast } from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animation from "../../assets/login-animation.json";
import { loginValidation } from "../../utilities/validations.tsx";

const Login = () => {
  const { login } = useLogin();
  const loginRef = useRef<LottieRefCurrentProps>(null);

  const handleLoginSubmit = async (
    values: LoginData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const data = { email: values.email, password: values.password };
      await login(data);
    } catch (error) {
      const errorMessage = (error as Error).message;

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-6 py-14 max-w-7xl mx-auto ">
        <div className="w-[500px] md:w-[400px] lg:w-[400px] px-2 lg:px-8 lg:mr-14  bg-white h-[29rem] flex flex-col justify-between py-4 rounded-md">
          <h1 className="text-3xl lg:text-4xl text-center mt-6 mb-4 font-extrabold text-[#22292f] relative group">
            Sign in to Account
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-[#22292f] my-4"></div>
          </h1>
          <div className="flex justify-center mt-4">
            <div className="flex w-1/2 justify-around">
              <MediaAuthGoogle />
              <MediaAuthGithub />
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">or use your email account</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidation}
            onSubmit={handleLoginSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="flex justify-center">
                  <div className="relative ">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-2 bg-gray-100 placeholder:px-7"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      data-cy="emailLogin"
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className=" text-red-600 text-base font-medium mx-auto w-full text-center mb-2"
                    />

                    {values.email === "" && (
                      <HiOutlineMail size={20} className="absolute top-2.5 left-5" />
                    )}
                  </div>
                </div>
                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out bg-gray-100 placeholder:px-7"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      data-cy="passwordLogin"
                    />
                    {values.password === "" && (
                      <RiLockPasswordLine size={20} className="absolute top-2.5 left-5" />
                    )}
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 font-medium text-base mx-auto w-full mt-2 mb-2 text-center"
                    />
                  </div>
                </div>
                <div className="flex justify-center text-xs mx-2 mb-6 w-80">
                  <p>
                    <span className="mr-1">Dont' have account?</span>
                    <Link
                      to="/signup"
                      className=" transition duration-200 ease-in-out font-semibold"
                    >
                      Register
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/forgotPassword"
                      className=" transition duration-200 ease-in-out ml-12 "
                    >
                      Forgot password?
                    </Link>
                  </p>
                </div>
                <div className="flex justify-center" data-cy="login-submit">
                  <Button className=" mb-4 px-5 mt-4 font-medium rounded-md" data-cy="loginButton">
                    Sign in
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="md:w-[67%] lg:w-[40%]  mb-12 md:mb-6 relative">
          <Lottie
            className="h-[250px] md:h-[400px] xxl:h-[550px] "
            onComplete={() => loginRef.current?.setDirection(-1)}
            lottieRef={loginRef}
            animationData={animation}
          />
        </div>
      </div>
    </section>
  );
};
export default Login;
