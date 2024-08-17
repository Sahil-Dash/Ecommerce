"use client";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{}, dispatch] = useStateProvider();
  const [dataFetched, setDataFetched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null || token === undefined) {
      console.log(token);
      router.push("/sign-in");
      return;
    }

    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user?token=${token}`
        );

        console.log(response.data);
        dispatch({ type: reducerCases.SET_USER, user: response.data.user });
        getCartProds(response.data.user.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
    console.log("user");
  }, []);

  const getCartProds = async (username: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/get-cart-prods?username=${username}`
      );

      if (response.status === 200) {
        let prod = response.data.cart_items;
        console.log(prod);
        dispatch({
          type: reducerCases.SET_CART_DATA,
          cart: prod,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setDataFetched(true);
  };

  return (
    <>
      {dataFetched && (
        <>
          <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
          </div>
          <div className="inline-flex">
            <SideBar />
            {children}
          </div>
        </>
      )}
    </>
  );
}
