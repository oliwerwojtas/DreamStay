import { useState } from "react";
//components
import { Spinner } from "../../components/shared/Spinner";
//utilities
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgotPasswordValidation } from "../../utilities/validations";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, values.email);
      toast.success("Email was sent");
    } catch (error) {
      const errorMessage = (error as Error).message;
      setLoading(false);
      toast.error(`${errorMessage}`);
    }

    setLoading(false);
  };

  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        {/* <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 relative">
          <img
            src="https://images.unsplash.com/photo-1514227973936-5bebfc160b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80"
            alt="green house photo"
            className="w-full rounded-md z-10 relative"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-20 rounded-md">
            <div className="flex justify-center items-center text-white h-full"></div>
          </div>
          <p className="absolute top-[25%] md:top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold z-30 text-white text-2xl">
            Hello, Friend!
            <span className="absolute top-[100%] left-1/2 transform -translate-x-1/2 w-1/5 h-[3px] bg-white my-4"></span>
          </p>
          <p className="w-3/4 md:w-2/3 absolute top-[45%] md:top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium z-30 text-white text-center text-lg">
            Fill up personal information and start journey with us.
          </p>
          <button className="absolute top-[70%] md:top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 px-12 py-2 border-white border-2 rounded-md font-semibold z-30 text-white">
            Sign up
          </button>
        </div> */}
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 bg-white h-[30rem] flex flex-col justify-between ">
          <h1 className="text-3xl text-center mt-6 font-extrabold text-green-600 relative group">
            Sign Up
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-green-600 my-4"></div>
          </h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={forgotPasswordValidation}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="flex justify-center">
                  <div className="relative">
                    <Field
                      className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1 mx-auto w-full"
                    />
                    {values.email === "" && (
                      <HiOutlineMail size={20} className="absolute top-2.5 left-5" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs mx-2 mb-12">
                  <p>
                    Back to login
                    <Link
                      to="/signup"
                      className="text-green-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"
                    ></Link>
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-1/2 bg-green-600 text-white px-7 py-3 mb-6 rounded-md font-semibold mx-auto"
                >
                  Sign up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
