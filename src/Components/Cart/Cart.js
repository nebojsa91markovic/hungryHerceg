import React, { useState, useContext, useEffect } from "react";
import { useGlobalContext } from "./context";
import NavbarCart from "./NavbarCart";
import CartContainer from "./CartContainer";
import FavoriteMealsCollection from "../../collections/FavoriteMealsCollection";
import { OrdersContext } from "../../Context/OrdersContext";
import { useCookies } from "react-cookie";
import UsersCollection from "../../collections/UsersCollection";

const Cart = ({ myCart, setMyCart, isClicked }) => {
  const { loading } = useGlobalContext();

  const [cookies] = useCookies(["user"]);
  const { orders, dispatchOrders } = useContext(OrdersContext);

  const [user, setUser] = useState({});

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
    FavoriteMealsCollection.doc(cookies.user).update({
      pizza: 1,
    });
  };

  const addOrder = () => {
    const newMeal = {
      consumer: `${user.firstName} ${user.lastName}`,
      payload: myCart,
    };
    dispatchOrders({
      type: "ADD_ORDER",
      payload: newMeal,
      orderId: "26d79253-ad3f-4a9e-aa0f-e2fff7991931",
    });

    alert("Meal successfully added!");
    setMyCart([]);
    addFavoriteMeal();
  };

  useEffect(() => {
    UsersCollection.doc(cookies.user)
      .get()
      .then((response) => {
        setUser(response.data());
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={`cart-wrapper${isClicked ? "-clicked" : ""}`}>
      <NavbarCart myCart={myCart} />

      <button onClick={addOrder}>Order</button>
      <CartContainer myCart={myCart} setMyCart={setMyCart} />
    </div>
  );
};

export default Cart;
