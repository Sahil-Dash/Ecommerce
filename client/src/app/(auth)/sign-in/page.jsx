"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();

    const data = { username, password };
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/signin`,
        data
      );
      // Replace with your API endpoint
      console.log(response.data, response.status);
      if (response.data.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          localStorage.setItem("token", response.data.token);
          router.push("/");
        }, [2000]);

        return;
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };
  return (
    <>
      <section className="bg-gray-50 rounded-lg dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignin}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className=" text-center">
                  <button
                    type="submit"
                    className="bg-black w-full rounded-md text-white py-2"
                  >
                    Login
                    <ToastContainer />
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 ">
                  Don't have an account?{" "}
                  <a
                    href="/sign-up"
                    className="font-medium text-slate-200 hover:underline hover:text-black "
                  >
                    Signup here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
