import { useStateProvider } from "@/context/StateContext";
import Link from "next/link";
import React, { useState } from "react";
import ShimmerButton from "./ui/shimmer-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { reducerCases } from "@/context/constants";
import axios from "axios";

const OrderSummary = () => {
  const [{ cart, user }, dispatch] = useStateProvider();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const originalPrice = cart.reduce(
    (acc: any, product: any) => acc + product.price * product.qty,
    0
  );

  const router = useRouter();

  const demoCouponCode = "#4R6D"; // Use this code for 15% discount on Total Product Price

  const handleCheckOut = async () => {
    if (!user) {
      toast.error("Please sign in to place an order");
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }
    console.log(user);

    if (originalPrice === 0) {
      toast.error("Cart is empty, please add some products");
      return;
    }

    let data = { username: user?.username };
    await axios.delete("http://localhost:5000/clear-cart", {
      data,
    });

    toast.success(
      `Order Place, Total Price :- ₹${Math.floor(
        couponApplied ? originalPrice * 0.15 : originalPrice + 50 + 9
      )}`
    );
    setCouponCode("");

    setTimeout(() => {
      dispatch({ type: reducerCases.EMPTY_CART });
      router.push("/");
    }, 2000);
  };

  const handleApplyCoupon = (e: any) => {
    e.preventDefault();

    if (couponCode === "") {
      toast.error("No Code present to be applied");
      return;
    }

    if (originalPrice === 0) {
      toast.error("Cart is empty, please add some products");
      return;
    }
    if (couponCode === demoCouponCode) {
      setCouponApplied(true);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  return (
    <>
      <div className=" mt-6 w-2/6 bg-blue-200">
        <div className=" rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            Order summary
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Original price
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  ₹{Math.floor(originalPrice)}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Delivery
                </dt>
                <dd className="text-base font-medium text-gray-900">₹50</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Tax
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  ₹9
                </dd>
              </dl>
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 py-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">
                Sub Total
              </dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">
                ₹
                {Math.floor(
                  originalPrice
                    ? couponApplied
                      ? originalPrice * 0.15
                      : originalPrice + 9 + 50
                    : 0
                )}
              </dd>
            </dl>
          </div>
          <button
            className="bg-black text-white rounded-md px-2 py-1 w-full"
            onClick={handleCheckOut}
          >
            Checkout
            <ToastContainer />
          </button>
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              or{" "}
            </span>
            <Link
              href="/"
              className="text-sm font-medium text-gray-900 hover:underline dark:text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Do you have a voucher or gift card?{" "}
              </label>
              <p className="text-sm text-gray-500 py-2">
                use code :- ({demoCouponCode}) for Demo use of 15% discount
              </p>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <div className=" flex  items-center justify-center">
              <ShimmerButton className="shadow-2xl" onClick={handleApplyCoupon}>
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Apply
                </span>
              </ShimmerButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
