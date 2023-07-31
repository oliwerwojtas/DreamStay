import { useRef } from "react";
import { useSignup } from "../../hooks/useSignup";
//components
import { Button } from "../../components/shared/Button";
//utilities
import { Link } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animation from "../../assets/registration-animation.json";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidation } from "../../utilities/validations";
import { FormData } from "../../types";

const SignUp = () => {
  const { signup } = useSignup();
  const registerRef = useRef<LottieRefCurrentProps>(null);

  const handleSignUpSubmit = async (
    values: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const data = { email: values.email, password: values.password, displayName: values.name };
      const result = await signup(data);
      const user = result.user;

      console.log(user);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="w-[500px] md:w-[400px] lg:w-[400px] px-2 lg:px-8 lg:ml-20 bg-white h-[30rem] flex flex-col justify-between py-4 rounded-md">
          <h1 className="text-3xl text-center mt-6 mb-4 font-extrabold text-[#22292f] relative group">
            Sign Up
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-[#22292f] my-4"></div>
          </h1>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={signupValidation}
            onSubmit={handleSignUpSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="flex justify-center">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-2 bg-gray-100 placeholder:px-7"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className=" text-red-600 text-base font-medium mx-auto w-full text-center mb-2"
                    />
                    {values.name === "" && (
                      <AiOutlineUser size={20} className="absolute top-2.5 left-5" />
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
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
                <div className="flex justify-center">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700  rounded-md transition ease-in-out mb-2 bg-gray-100 placeholder:px-7"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className=" text-red-600 text-base font-medium mx-auto w-full text-center mb-2"
                    />
                    {values.password === "" && (
                      <RiLockPasswordLine size={20} className="absolute top-2.5 left-5" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs mx-2 mb-6 ">
                  <Link
                    to="/login"
                    className=" transition duration-200 ease-in-out ml-1 font-semibold"
                  >
                    Back to login
                  </Link>

                  <Link to="/forgotPassword" className=" transition duration-200 ease-in-out ml-1 ">
                    Forgot password?
                  </Link>
                </div>
                <div className="flex justify-center">
                  <Button className="mb-4 px-5 mt-4 font-medium rounded-md">Sign up</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="md:w-[67%] lg:w-[40%]">
          <Lottie
            className="h-[250px] md:h-[400px] xxl:h-[550px] "
            onComplete={() => registerRef.current?.setDirection(-1)}
            lottieRef={registerRef}
            animationData={animation}
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
