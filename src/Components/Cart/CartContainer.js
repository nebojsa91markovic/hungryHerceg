import React from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";
import numeral from "../../services/numeral";
numeral.locale("srb");

const CartContainer = () => {
  const { cart, total, clearCart } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your order</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header className="title">
        <h2>your order</h2>
        <div className="underline"></div>
      </header>

      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{numeral(total).format("$ 0,0.00")}</span>
          </h4>
        </div>
        <button className="filter-btn" onClick={clearCart}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
