import React, { useEffect, useState } from "react";
import AllOrders from "./AllOrders";
import OrderCategories from "./OrderCategories";
import items from "./allOrdersData";
import OrdersCollection from "../../collections/OrdersCollection";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];
//console.log(allCategories);

function ShowAllOrders({ orderId }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const setTable = () => {
    let tableArray = [];

    //OrdersCollection.doc("26d79253-ad3f-4a9e-aa0f-e2fff7991931");
    OrdersCollection.doc(orderId)
      .get()
      .then((response) => {
        console.log(response);
        console.log(response.data());

        let i = 1;
        response.data().allMeals.forEach((order) => {
          order.payload.forEach((meal) => {
            let newObj = {
              num: i,
              user: order.consumer,
              name: meal.title,
              amount: meal.amount,
              note: meal.note,
              price: meal.price * meal.amount * 100,
            };
            tableArray.push(newObj);
            i++;
          });
        });
      })
      .then(() => {
        let sum = 0;
        tableArray.forEach((row) => {
          sum += row.price;
        });
        let total = { note: "TOTAL:", price: sum };
        tableArray.push(total);
      })
      .then(() => {
        setMenuItems(tableArray);
      });
  };

  const updateTable = () => {
    // OrdersCollection.doc("26d79253-ad3f-4a9e-aa0f-e2fff7991931").onSnapshot(
    OrdersCollection.doc(orderId).onSnapshot(() => {
      setTable();
    });
  };

  useEffect(() => {
    setTable();
    updateTable();
  }, []);

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>All Orders</h2>
          <div className="underline"></div>
        </div>

        {/* <OrderCategories filterItems={filterItems} categories={categories} /> */}

        <AllOrders
          items={menuItems}
          setMenuItems={setMenuItems}
          orderId={orderId}
        />
      </section>
    </main>
  );
}

export default ShowAllOrders;
