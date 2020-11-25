import React from "react";
import { useGlobalContext } from "./context";
import NavbarCart from "./NavbarCart";
import CartContainer from "./CartContainer";

const Cart = ({ myCart, setMyCart, isClicked }) => {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }


  return (
    <div className={`cart-wrapper${isClicked ? '-clicked' : ''}`}>
      <NavbarCart myCart={myCart} />
      <CartContainer myCart={myCart} setMyCart={setMyCart} />
    </div>
  );
}

export default Cart;
