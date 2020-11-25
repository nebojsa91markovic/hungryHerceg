import React from "react";
import { useGlobalContext } from "./context";
import NavbarCart from "./NavbarCart";
import CartContainer from "./CartContainer";

function Cart({ myCart, setMyCart }) {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <NavbarCart />
      <CartContainer myCart={myCart} setMyCart={setMyCart} />
    </main>
  );
}

export default Cart;
