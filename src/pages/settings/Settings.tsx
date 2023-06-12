import { useState } from "react";

export const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Oliwer",
    email: "olo_wojtas@o2.pl",
  });

  const { name, email } = formData;
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-1/2 mt-6 px-3">
        <form>
          <input
            type="text"
            id="name"
            value={name}
            disabled
            className="w-full px-4 p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full px-4 p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
          />

          <div className="flex justify-between whitespace-nowrap text-lg md:text-sm">
            <p className="flex items-center mb-6">
              Do you want to change your name?
              <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                Edit
              </span>
            </p>
            <p className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">
              Sign out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
