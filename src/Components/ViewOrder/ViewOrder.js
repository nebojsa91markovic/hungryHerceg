import React, { useState, useEffect, useContext } from "react";
import RestoranItems from "../RestoranItems/RestoranItems";
import FilterRestoranItems from "../FilterRestoranItems/FilterRestoranItems";
import items from "./data";
import RestaurantCollection from "../../collections/RestaurantCollection";
import FavoriteMealsCollection from "../../collections/FavoriteMealsCollection";
import Cart from "../Cart/Cart";
import { AppProvider } from "../Cart/context";
import ShowAllOrders from "../ShowAllOrders/ShowAllOrders";
import { OrdersContext } from "../../Context/OrdersContext";
import BackButton from "../BackButton/BackButton";
import { AiFillCaretUp } from "react-icons/ai";
import "./style.css";

const ViewOrder = () => {
  const [myCart, setMyCart] = useState([]);
  const { orders, dispatchOrders } = useContext(OrdersContext);

  const [isClicked, setIsClicked] = useState(false);

  const newMeals = {
    consumer: "Nebojsa Markovic",
    payloads: [
      {
        quantity: 2,
        mealId: "d53e202a-3s17c-4bad-99d5-1b7a446f9e26",
      },
      {
        quantity: 1,
        mealId: "d53e202a-3s17c-4bad-99d5-1b7a446f9e26",
      },
    ],
  };

  const addFavoriteMeal = () => {
    FavoriteMealsCollection.doc("AWOvrTz4ITrTxeomq48A").update({
      pizza: 1,
    });
  };

  const addOrder = () => {
    dispatchOrders({
      type: "ADD_ORDER",
      payload: newMeals,
      orderId: "07a398e4-696a-4f06-8fa9-f13ca7b79c3f",
    });

    alert("Meal successfully added!");

    addFavoriteMeal();
  };

  const getAllMeals = () => {
    RestaurantCollection.doc("068e8950-ad3d-456b-b09a-190db1fb2abe")
      .get()
      .then((response) => {
        setMenuItems(response.data().meals);
        return response.data().meals;
      });
  };

  useEffect(() => {
    getAllMeals();
  }, []);

  const allCategories = ["all", ...new Set(items.map((item) => item.category))];

  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <div className="order-wrapper">
      <BackButton />
      <main>
        <button onClick={addOrder}>Add meal to order</button>
        <section className="menu section">
          <div className="title">
            <h2>tesla menu</h2>
            <div className="underline"></div>
          </div>

          <FilterRestoranItems
            filterItems={filterItems}
            categories={categories}
          />
          <RestoranItems
            items={menuItems}
            myCart={myCart}
            setMyCart={setMyCart}
          />
          <AppProvider>
            <Cart myCart={myCart} setMyCart={setMyCart} isClicked={isClicked} />
          </AppProvider>

          <ShowAllOrders />
        </section>
      </main>
      <div onClick={() => setIsClicked(!isClicked)} className="show-cart">
        <span>CART</span>
        <div className="nav-container">
          <div className="amount-container">
            <p className="total-amount">{myCart.length}</p>
          </div>
        </div>
        <AiFillCaretUp className="caret-up" />
      </div>
    </div>
  );
};

export default ViewOrder;
