"use client";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const validateData = () => {
    // Basic checks

    if (username.length < 3) {
      toast.warning("Username must be atleast 3 characters long");
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return false;
    }

    // More complex checks using regular expressions
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?.])[a-zA-Z\d@$!%*?.]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least one uppercase, lowercase, number, and special character"
      );
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const data = { username, email, password };
      console.log(data);
      try {
        const response = await axios.post("http://localhost:5000/signup", data);
        // Replace with your API endpoint
        console.log(response.data, response.status);
        if (response.data.status === 200) {
          toast.success("Signup successful!");
          setTimeout(() => {
            localStorage.setItem("token", response.data.token);
            router.push("/");
          }, [2000]);
        } else {
          toast.error(response.data.error);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 rounded-lg dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="max-w-10 bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus-ring-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="absolute top-1/2 pt-10 right-4 transform -translate-y-1/2 bg-transparent hover:text-gray-400 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmed Password"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus-ring-gray-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 pt-10 right-4 transform -translate-y-1/2 bg-transparent hover:text-blue-500 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <div className=" text-center">
                  <button
                    type="submit"
                    className="bg-black w-full rounded-md text-white py-2"
                  >
                    Create an account
                    <ToastContainer />
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="font-medium text-slate-200 hover:underline hover:text-black "
                  >
                    Login here
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

export default page;
