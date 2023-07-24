import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginData } from "../../types";
import { MediaAuth } from "../../components/auth/GoogleAuth";
import { MediaAuthGithub } from "../../components/auth/GithubAuth";
import { toast } from "react-toastify";
import { useLogin } from "../../hooks/useLogin";
import { SignupError } from "../../types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from "../../components/shared/Button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animation from "../../assets/login-animation.json";
const Login = () => {
  const { login } = useLogin();
  const loginRef = useRef<LottieRefCurrentProps>(null);
  const [error, setError] = useState<SignupError | null>(null);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginSubmit = async (
    values: LoginData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const data = { email: values.email, password: values.password };
      await login(data);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-8xl mx-auto lg:ml-36">
        <div className="w-[500px] md:w-[400px] lg:w-[400px] px-2 lg:px-8 lg:mr-10 bg-white h-[30rem] flex flex-col justify-between rounded-md">
          <h1 className="text-3xl lg:text-4xl text-center mt-6 font-extrabold text-[#22292f] relative group">
            Sign in to Account
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-[#22292f] my-4"></div>
          </h1>
          <div className="flex justify-center mt-4">
            <div className="flex w-1/2 justify-around">
              <MediaAuth />
              <MediaAuthGithub />
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">or use your email account</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
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
                <div className="flex justify-between text-xs mx-2 mb-6 ">
                  <p>
                    Dont' have account?
                    <Link
                      to="/signup"
                      className=" transition duration-200 ease-in-out ml-1 font-semibold"
                    >
                      Register
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/forgotPassword"
                      className=" transition duration-200 ease-in-out ml-1 "
                    >
                      Forgot password?
                    </Link>
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button className=" mb-4 px-5 mt-4 font-medium rounded-md">Sign in</Button>
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
