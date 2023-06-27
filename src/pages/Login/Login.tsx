import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { LoginData } from "../../types";
import { MediaAuth } from "../../components/auth/GoogleAuth";
import { MediaAuthGithub } from "../../components/auth/GithubAuth";
import { toast } from "react-toastify";
import { useLogin } from "../../hooks/useLogin";
import { SignupError } from "../../types";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
export const Login = () => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const [error, setError] = useState<SignupError | null>(null);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = { email, password };
      await login(data);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });

      toast.error(errorMessage);
    }
  };

  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 relative">
          <img
            src="https://images.unsplash.com/photo-1514227973936-5bebfc160b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80"
            alt="green house photo"
            className="w-full rounded-2xl z-10 relative"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-20 rounded-2xl">
            <div className="flex justify-center items-center text-white h-full"></div>
          </div>
          <p className="absolute top-[25%] md:top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold z-30 text-white text-2xl">
            Hello, Friend!
            <span className="absolute top-[100%] left-1/2 transform -translate-x-1/2 w-1/5 h-[3px] bg-white my-4"></span>
          </p>
          <p className="w-3/4 md:w-1/2 absolute top-[45%] md:top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium z-30 text-white text-center text-lg">
            Fill up personal information and start journey with us.
          </p>
          <button
            className="absolute top-[70%] md:top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 px-12 py-2 border-white border-2 rounded font-semibold z-30 text-white"
            onClick={handleNavigate}
          >
            Sign up
          </button>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 bg-white h-[30rem] flex flex-col justify-between rounded">
          <h1 className="text-3xl text-center mt-6 font-extrabold text-green-600 relative group">
            Sign in to Account
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/6 h-[3px] bg-green-600 my-4"></div>
          </h1>
          <div className="flex justify-center mt-8">
            <div className="flex w-1/2 justify-around">
              <MediaAuth />
              <MediaAuthGithub />
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">or use your email account</p>
          <form onSubmit={handleLoginSubmit}>
            <div className="flex justify-center relative">
              <input
                className="w-80 px-4 py-2 text-base text-gray-700 rounded transition ease-in-out mb-6 bg-gray-100 placeholder:px-4"
                type="email"
                id="email"
                value={email}
                onChange={handleChangeData}
                placeholder="Email"
              />
              {email === "" && <HiOutlineMail size={20} className="absolute top-2.5 left-4" />}
            </div>
            <div className="flex justify-center relative mb-6">
              <input
                className="w-80 px-4 py-2 text-base text-gray-700  rounded transition ease-in-out mb-6 bg-gray-100 placeholder:px-4"
                type="password"
                id="password"
                value={password}
                onChange={handleChangeData}
                placeholder="Password"
              />
              {password === "" && (
                <RiLockPasswordLine size={20} className="absolute top-2.5 left-4" />
              )}
            </div>
            <div className="flex whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 mx-auto">
                Dont' have account?
                <Link
                  to="/signup"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-green-600 hover:bg-green-700 text-white px-7 py-3 mb-6 rounded font-semibold"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
