import React from "react";
import { useGlobalContext } from "./context";
import numeral from "../../services/numeral";
numeral.locale("srb");

const CartItem = ({ id, note, title, price, amount, removeItem }) => {
  //const { remove } = useGlobalContext();

  return (
    <article className="cart-item">
      <h4 className="h4-Capitalize">{title}</h4>
      {/* remove button */}
      <button className="filter-btn" onClick={() => removeItem(id)}>
        remove
      </button>
      <p className="amount">{amount}</p>
      {/* <h4 className='item-price'>{price} din</h4> */}
      <h4 className="item-price">
        {numeral(price * amount).format("0,0.00 $")}{" "}
      </h4>

      <div>
        <p className="cart-note">{note}</p>
      </div>
    </article>
  );
};

export default CartItem;
