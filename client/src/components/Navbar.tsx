"use client";
import React, { useState } from "react";
import { reducerCases } from "@/context/constants";
import { watchProds, shoeProds, shirtProds } from "@/lib/constants";
import { Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useStateProvider } from "@/context/StateContext";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [{ cart }, dispatch] = useStateProvider();
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Products"
            value={0}
          >
            <div className="flex flex-col space-y-4 text-sm">
              <div
                onClick={() =>
                  dispatch({
                    type: reducerCases.SET_PRODUCTS,
                    products: watchProds,
                  })
                }
              >
                Watch
              </div>
              <div
                onClick={() =>
                  dispatch({
                    type: reducerCases.SET_PRODUCTS,
                    products: shoeProds,
                  })
                }
              >
                Shoes
              </div>
              <div
                onClick={() =>
                  dispatch({
                    type: reducerCases.SET_PRODUCTS,
                    products: shirtProds,
                  })
                }
              >
                T-shirts
              </div>
            </div>
          </MenuItem>
        </Link>
        <Link href="/cart">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Cart"
            value={cart.length}
          >
            {cart.length > 0 ? (
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                {cart.map((item: any) => (
                  <ProductItem
                    key={item.id}
                    name={item.name}
                    src={item.image}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <p>Empty Cart</p>
              </div>
            )}
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
