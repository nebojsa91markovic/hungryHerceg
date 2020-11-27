import React, { useState, useEffect, useContext } from "react";
import RestoranItems from "../RestoranItems/RestoranItems";
// import FilterRestoranItems from "../FilterRestoranItems/FilterRestoranItems";
import items from "./data";
// import RestaurantCollection from "../../collections/RestaurantCollection";
import Cart from "../Cart/Cart";
import { AppProvider } from "../Cart/context";
import ShowAllOrders from "../ShowAllOrders/ShowAllOrders";
import BackButton from "../BackButton/BackButton";
import { AiFillCaretUp } from "react-icons/ai";
import "./style.css";
import { useParams } from "react-router-dom";
import OrdersCollection from "../../collections/OrdersCollection";
import { RestaurantsContext } from "../../Context/RestaurantsContext";

const ViewOrder = () => {
  const [myCart, setMyCart] = useState([]);
  const [resId, setResId] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { restaurants } = useContext(RestaurantsContext);

  const orderId = useParams().orderId;

  const getAllMeals = (id) => {
    // RestaurantCollection.doc("068e8950-ad3d-456b-b09a-190db1fb2abe")
    // RestaurantCollection.doc(id)
    //   .get()
    //   .then((response) => {
    //     // setMenuItems(response.data().meals);
    //     // return response.data().meals;

    //     setMenuItems(response.data().meals);
    //     return response.data().meals;
    //   });
    let newArr = restaurants.allRestaurants.filter((res) => res.id === id)[0];
    setMenuItems(newArr.meals);
  };

  const getRestaurantId = () => {
    OrdersCollection.doc(orderId)
      .get()
      .then((response) => {
        setResId(response.data().restaurantName.restaurantName);
        getAllMeals(response.data().restaurantId);
      });
  };

  useEffect(() => {
    getRestaurantId();
    //getAllMeals();
  }, []);

  // const allCategories = ["all", ...new Set(items.map((item) => item.category))];

  const [menuItems, setMenuItems] = useState(items);
  // const [categories, setCategories] = useState(allCategories);

  // const filterItems = (category) => {
  //   if (category === "all") {
  //     setMenuItems(items);
  //     return;
  //   }
  //   const newItems = items.filter((item) => item.category === category);
  //   setMenuItems(newItems);
  // };

  return (
    <div className="order-wrapper">
      <BackButton />
      <main>
        <section className="menu section">
          <div className="title">
            <h2>{resId === undefined ? "Menu" : resId}</h2>
            <div className="underline"></div>
          </div>

          {/* <FilterRestoranItems
            filterItems={filterItems}
            categories={categories}
          /> */}
          <RestoranItems
            items={menuItems}
            myCart={myCart}
            setMyCart={setMyCart}
          />
          <AppProvider>
            <Cart
              myCart={myCart}
              setMyCart={setMyCart}
              isClicked={isClicked}
              orderId={orderId}
            />
          </AppProvider>

          <ShowAllOrders orderId={orderId} />
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
