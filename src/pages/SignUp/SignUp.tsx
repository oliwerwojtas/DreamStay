import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

import { useSignup } from "../../hooks/useSignup";
import { FormData } from "../../types";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
export const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const { signup } = useSignup();

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = { email, password, displayName: name };
      const result = await signup(data);
      const user = result.user;

      console.log(user);
    } catch (error) {
      toast.error("Somethin went wrong");
    }
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
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 bg-white h-[30rem] flex flex-col justify-between py-4 ">
          <h1 className="text-4xl text-center mt-6 font-extrabold text-[#22292f] relative group">
            Sign Up
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-[#22292f] my-4"></div>
          </h1>

          <form onSubmit={handleSignUpSubmit}>
            <div className="flex justify-center">
              <div className="relative">
                <input
                  className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleChangeData}
                  placeholder="Full Name"
                />
                {name === "" && <AiOutlineUser size={20} className="absolute top-2.5 left-5" />}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <input
                  className="w-80 px-4 py-2 text-base text-gray-700 rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChangeData}
                  placeholder="Email"
                />
                {email === "" && <HiOutlineMail size={20} className="absolute top-2.5 left-5" />}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <input
                  className="w-80 px-4 py-2 text-base text-gray-700  rounded-md transition ease-in-out mb-6 bg-gray-100 placeholder:px-7"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChangeData}
                  placeholder="Password"
                />
                {password === "" && (
                  <RiLockPasswordLine size={20} className="absolute top-2.5 left-5" />
                )}
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
              <button
                type="submit"
                className="flex mb-4 items-center gap-2 px-5 py-2 mt-4 font-medium rounded-md text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
