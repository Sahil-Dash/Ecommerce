"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronRightIcon, ArrowUpIcon } from "lucide-react";

import { AnimatedSubscribeButton } from "../ui/animated-button";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Image from "next/image";
import { Modal, ModalTrigger } from "../ui/animated-modal";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  isPresent,
  title,
  image,
  desc,
  price,
}: {
  className?: string;
  id: string;
  isPresent: boolean;
  desc: string;
  title?: string | React.ReactNode;
  image: string;
  price: number;
}) => {
  const [{ cart, user }, dispatch] = useStateProvider();
  const router = useRouter();

  const addToCart = async () => {
    if (isPresent) {
      router.push("/cart");
      return;
    }
    try {
      let data = {
        product_id: id,
        prodname: title,
        username: user?.username,
        desc: desc,
        price: price.toString(),
        image: image,
        quantity: 1,
      };
      const response = await axios.post(
        "http://localhost:5000/add-to-cart",
        data
      );
      console.log(response.status);
      if (response.status === 200) {
        dispatch({
          type: reducerCases.ADD_PRODUCT_TO_CART,
          cart: {
            id: id,
            name: title,
            price: price,
            desc: desc,
            image: image,
            qty: 1,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={cn(
          "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
          className
        )}
      >
        <div className="h-[9rem] w-full flex">
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <p>₹ {price}</p>
          <div className="flex justify-between font-sans font-bold text-neutral-600 dark:text-neutral-200 ">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {desc.length > 70 ? desc.slice(0, 70) + "....." : desc}
          </div>
          <div className="flex items-center justify-center">
            <AnimatedSubscribeButton
              buttonColor="#000000"
              buttonTextColor="#ffffff"
              subscribeStatus={isPresent ? true : false}
              initialText={
                <span
                  onClick={addToCart}
                  className="group inline-flex items-center"
                >
                  {isPresent ? (
                    <Modal>
                      <ModalTrigger className=" flex justify-center group/modal-btn">
                        <span className="text-white group-hover/modal-btn:translate-x-40 inline-flex text-center transition duration-500">
                          Added
                          <CheckIcon className="ml-2 pt-1 h-4 w-4" />
                        </span>
                        <div className="text-white -translate-x-40 group-hover/modal-btn:translate-x-0  inline-flex items-center justify-center absolute inset-0 transition duration-500  z-20">
                          Cart
                          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </ModalTrigger>
                    </Modal>
                  ) : (
                    <>
                      Add To Cart
                      <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              }
              changeText={
                <Link href="/cart">
                  <div className=" flex items-center justify-center">
                    <Modal>
                      <ModalTrigger className=" flex justify-center group/modal-btn">
                        <span className="group-hover/modal-btn:translate-x-40 inline-flex text-center transition duration-500">
                          Added
                          <CheckIcon className="ml-2 pt-1 h-4 w-4" />
                        </span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0  inline-flex items-center justify-center absolute inset-0 transition duration-500  z-20">
                          Cart
                          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </ModalTrigger>
                    </Modal>
                  </div>
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
