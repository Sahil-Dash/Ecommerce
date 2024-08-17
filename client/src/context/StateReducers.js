"use client";
import { watchProds } from "@/lib/constants";
import { reducerCases } from "./constants";

export const initialState = {
  user: null,
  cart: [],
  products: watchProds,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case reducerCases.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case reducerCases.SET_CART_DATA:
      return {
        ...state,
        cart: action.cart,
      };

    case reducerCases.UPDATE_PROD_QTY:
      if (action.product.qty < 0) {
        return state;
      }
      const updatedProduct = state.cart.map((product) => {
        if (product.id === action.product.id) {
          return { ...product, qty: action.product.qty };
        }
        return product;
      });
      return { ...state, cart: updatedProduct };

    case reducerCases.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.id),
      };
    case reducerCases.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.cart],
      };
    case reducerCases.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
  }
};

export default reducer;
