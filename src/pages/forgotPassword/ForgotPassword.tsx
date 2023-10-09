import { useState } from "react";
//components
import { Spinner } from "../../components/shared/Spinner";
import { Button } from "../../components/shared/Button";
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
    <section className="flex justify-center flex-wrap items-center px-6 py-14 max-w-7xl mx-auto ">
      <div className="w-[400px] lg:ml-20 bg-white h-[30rem] flex flex-col rounded-md">
        <h1 className="text-3xl lg:text-4xl text-center mt-6 mb-36 font-extrabold text-[#22292f] relative group">
          Reset password
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-[#22292f] my-8"></div>
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
              <div className="flex text-xs mx-10 mb-12">
                <Link
                  to="/login"
                  className=" transition duration-200 ease-in-out ml-1 font-semibold"
                >
                  Back to login
                </Link>
              </div>
              <div className="flex justify-center" data-cy="login-submit">
                <Button className=" mb-4 px-5 mt-4 font-medium rounded-md">Reset</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ForgotPassword;
