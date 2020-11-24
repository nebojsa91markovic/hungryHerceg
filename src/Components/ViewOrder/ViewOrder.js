import React, { useState } from "react";
import RestoranItems from "../RestoranItems/RestoranItems";
import FilterRestoranItems from "../FilterRestoranItems/FilterRestoranItems";
import items from "./data";
import "./style.css";
import OrdersCollection from "../../collections/OrdersCollection";
import RestaurantCollection from "../../collections/RestaurantCollection";
import FavoriteMealsCollection from "../../collections/FavoriteMealsCollection";
import firebase from "firebase/app";
import Cart from "../Cart/Cart";
import { AppProvider } from "../Cart/context";
import ShowAllOrders from "../ShowAllOrders/ShowAllOrders";

const ViewOrder = () => {
  const newMeals = {
    consumer: "Bata",
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
    console.log("test2");

    FavoriteMealsCollection.doc("C653YQ51XdA5gqWXUWRw").update({
      pizza: 1,
    });
  };

  const addOrder = () => {
    console.log("test1");
    OrdersCollection.doc("89cHkUJiwrqiXW8v10TY").update({
      allMeals: firebase.firestore.FieldValue.arrayUnion(newMeals),
    });
    addFavoriteMeal();
  };

  const getAllMeals = () => {
    RestaurantCollection.doc("7RzppUo5Bg70pgbrZ8x0")
      .get()
      .then((response) => {
        setMenuItems(response.data().meals);
        return response.data().meals;
      });
  };
  //getAllMeals()

  const allCategories = ["all", ...new Set(items.map((item) => item.category))];
  console.log(allCategories);

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
        <RestoranItems items={menuItems} />

        {/* <AppProvider>
          <Cart />
        </AppProvider> */}

        <ShowAllOrders />
      </section>
    </main>
  );
};

export default ViewOrder;
