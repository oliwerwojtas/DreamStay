import { useRef } from "react";
import { Link } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animation from "../../assets/registration-animation.json";
import { useSignup } from "../../hooks/useSignup";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "../../components/shared/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormData } from "../../types";
const SignUp = () => {
  const { signup } = useSignup();
  const registerRef = useRef<LottieRefCurrentProps>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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
        <div className="w-full md:w-[67%] lg:w-[40%] px-6 lg:ml-20 bg-white h-[30rem] flex flex-col justify-between py-4 rounded-md">
          <h1 className="text-4xl text-center mt-6 font-extrabold text-[#22292f] relative group">
            Sign Up
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-[#22292f] my-4"></div>
          </h1>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUpSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex justify-center">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs text-center"
                    />
                    <AiOutlineUser size={20} className="absolute top-2.5 left-5" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                    <HiOutlineMail size={20} className="absolute top-2.5 left-5" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700  rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                    <RiLockPasswordLine size={20} className="absolute top-2.5 left-5" />
                  </div>
                </div>
                <div className="flex justify-between text-xs mx-2 mb-12">
                  <p>
                    <Link
                      to="/login"
                      className="text-green-600 hover:text-green-800 transition duration-200 ease-in-out ml-1"
                    >
                      Back to login
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/forgotPassword"
                      className="text-green-600 hover:text-green-800 transition duration-200 ease-in-out ml-1 "
                    >
                      Forgot password?
                    </Link>
                  </p>
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
