import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import React from "react";
import { Trash2Icon } from "lucide-react";
import axios from "axios";

const CartItems = ({
  price,
  qty,
  desc,
  imgSrc,
  name,
  id,
}: {
  price: number;
  desc: string;
  name: string;
  id: string;
  qty: number;
  imgSrc: string;
}) => {
  const [{ user }, dispatch] = useStateProvider();

  const removeFromCart = async () => {
    let data = { username: user?.username, prodId: id };
    const res = await axios.delete("http://localhost:5000/delete-prod", {
      data,
    });
    if (res.status === 200) {
      dispatch({
        type: reducerCases.REMOVE_PRODUCT_FROM_CART,
        id: id,
      });
    }
  };

  const updateProdQty = async (type: string) => {
    console.log(type);
    let data = { username: user?.username, prodId: id, type: type, qty: qty };
    console.log(data);
    const res = await axios.put("http://localhost:5000/update-cart-qty", {
      ...data,
    });
    if (res.status === 200) {
      dispatch({
        type: reducerCases.UPDATE_PROD_QTY,
        product: { id: id, qty: type === "inc" ? qty + 1 : qty - 1 },
      });
    }
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <div className="h-15 w-20">
            <img
              src={imgSrc}
              alt="card-image"
              className="h-full w-full object-cover rounded-sm"
            />
          </div>
          {name}
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <p style={{ visibility: "hidden" }}> {desc.slice(0, 50)}</p>

            <div className="flex items-center">
              <button
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={() => updateProdQty("dec")}
              >
                -
              </button>
              <input
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                value={qty}
              />
              <button
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={() => updateProdQty("inc")}
              >
                +
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ₹{price}
              </p>
            </div>
          </div>
          <div className=" min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <div className="flex items-center gap-4">
              <button
                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                onClick={removeFromCart}
              >
                <Trash2Icon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
