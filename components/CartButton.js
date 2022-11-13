import { ShoppingCart } from "@mui/icons-material";
import { Badge, Button } from "@mui/material";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";

export default function CartButton() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    const data = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    dispatch({ type: "SAVE_CART_ITEMS", payload: data });
  }, []);

  return (
    <NextLink href="/cart" passHref>
      <Button color="success" size="large">
        {cart.cartItems.length > 0 ? (
          <Badge badgeContent={cart.cartItems.length}>
            <ShoppingCart />
          </Badge>
        ) : (
          <ShoppingCart />
        )}
      </Button>
    </NextLink>
  );
}
