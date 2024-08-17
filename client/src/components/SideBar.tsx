"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler } from "@tabler/icons-react";
import Link from "next/link";
import { ShoppingCartIcon, User2Icon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStateProvider } from "@/context/StateContext";

export default function SideBar() {
  const [{ user, cart }] = useStateProvider();

  const links = [
    {
      label: "Products",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Cart",
      href: "/cart",
      icon: (
        <ShoppingCartIcon
          fill={cart.length > 0 ? "black" : "white"}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Logout",
      href: "/sign-in",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "rounded-md  flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800   mx-auto border border-neutral-200 dark:border-neutral-700 ",
          "h-full"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={false}>
          <SidebarBody className="justify-between gap-2">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* {open ? <Logo /> : <LogoIcon />} */}
              <Logo />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div key={idx} className="py-3">
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
            <div className="py-3">
              <SidebarLink
                link={{
                  label: `${user?.username}`,
                  href: "/",
                  icon: (
                    <User2Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        {/* <div className="flex justify-center items-center ">{component}</div> */}
      </div>
    </>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Ecommerce
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
