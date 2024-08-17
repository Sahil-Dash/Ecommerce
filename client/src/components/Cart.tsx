"use client";
import React, { useEffect } from "react";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { reducerCases } from "@/context/constants";

const Cart = () => {
  const [{ cart, user }, dispatch] = useStateProvider();
  const router = useRouter();

  useEffect(() => {
    const getCartProds = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-cart-prods?username=${user?.username}`
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
    };

    if (cart.length === 0) {
      console.log(cart);
      getCartProds();
    }
  }, []);

  console.log(cart);

  return (
    <section className="bg-white overflow-y-auto overflow-x-hidden  py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className=" mx-auto w-[80vw] max-w-screen-xl px-4 2xl:px-0 ">
        <h2 className="mt-10   pl-10 text-3xl font-bold sm:text-2xl">
          {cart.length > 0 ? (
            <>Shopping Cart</>
          ) : (
            <div className="flex justify-center items-center pr-64">
              Empty Cart
            </div>
          )}
        </h2>
        {cart.length > 0 ? (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((item: any) => (
                  <CartItems
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    desc={item.desc}
                    qty={item.qty}
                    imgSrc={item.image}
                  />
                ))}
              </div>
            </div>
            <OrderSummary />
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Cart;
