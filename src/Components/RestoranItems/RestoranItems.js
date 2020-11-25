import React, { useState, useContext } from "react";

const RestoranItems = ({ items, myCart, setMyCart }) => {
  // const [mealPrice, setMealPrice] = useState(0)
  // const [mealPrice, setMealPrice] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault();
    const { amount, note, mealId, mealTitle, mealPrice } = event.target;
    setMyCart([
      ...myCart,
      {
        id: mealId.value,
        note: note.value,
        title: mealTitle.value,
        price: mealPrice.value,
        amount: amount.value === "" ? 1 : amount.value,
      },
    ]);
  };

  return (
    <div className="section-center">
      {items.map((menuItem) => {
        const { id, title, img, desc, price } = menuItem;
        return (
          <article key={id} className="menu-item">
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  name="mealTitle"
                  disabled
                  hidden
                />
                <input
                  type="text"
                  value={price}
                  name="mealPrice"
                  disabled
                  hidden
                />
                <input type="text" value={id} name="mealId" disabled hidden />
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="1"
                  min="1"
                  max="10"
                />
                <button type="submit" className="filter-btn">
                  Add to cart
                </button>
                <textarea
                  name="note"
                  id="note"
                  cols="30"
                  rows="2"
                  placeholder="Add your note..."
                ></textarea>
              </form>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default RestoranItems;
