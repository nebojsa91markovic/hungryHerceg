import React from "react";
import CartItem from "./CartItem";
import numeral from "../../services/numeral";
numeral.locale("srb");

const CartContainer = ({ myCart, setMyCart }) => {
  if (myCart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your order</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  const clearCart = () => {
    setMyCart([]);
  };

  const getTotal = () => {
    let totalSum = 0;
    myCart.forEach((element) => {
      const { amount, price } = element;
      totalSum += amount * price;
    });
    return totalSum;
  };

  return (
    <section className="cart">
      <header className="title">
        <h2>your order</h2>
        <div className="underline"></div>
      </header>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{numeral(getTotal()).format("$ 0,0.00")}</span>
          </h4>
        </div>
        <button className="filter-btn" onClick={clearCart}>
          clear cart
        </button>
      </footer>

      <div className="cart-items">
        {myCart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>

    </section>
  );
};

export default CartContainer;
