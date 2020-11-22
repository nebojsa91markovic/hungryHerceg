
import React, { useState } from 'react';
import RestoranItems from "../RestoranItems/RestoranItems"
import FilterRestoranItems from "../FilterRestoranItems/FilterRestoranItems"
import items from "./data"
import "./style.css"
import OrdersCollection from "../../collections/OrdersCollection"
import RestaurantCollection from "../../collections/RestaurantCollection"
import firebase from 'firebase/app'

const ViewOrder = () => {

  const newMeals = {
    "consumer": "Bata",
    "payloads": [
        {
            "quantity": 2,
            "mealId": "d53e202a-3s17c-4bad-99d5-1b7a446f9e26"
        },
        {
          "quantity": 1,
          "mealId": "d53e202a-3s17c-4bad-99d5-1b7a446f9e26"
      }
    ]
}

  const addOrder = () => {
    OrdersCollection.doc('89cHkUJiwrqiXW8v10TY').update({
      allMeals: firebase.firestore.FieldValue.arrayUnion(newMeals)
    })
  }

  const getAllMeals = () => {
    RestaurantCollection.doc('7RzppUo5Bg70pgbrZ8x0').get()
    .then(response => {
      setMenuItems(response.data().meals)
      return response.data().meals;
    })
  }
  //getAllMeals()

    const allCategories = ['all', ...new Set(items.map((item) => item.category))];
    console.log(allCategories)

    const [menuItems, setMenuItems] = useState(items);
    const [categories, setCategories] = useState(allCategories);

    const filterItems = (category) => {
        if (category === 'all') {
          setMenuItems(items);
          return;
        }
        const newItems = items.filter((item) => item.category === category);
        setMenuItems(newItems);
      };

    return ( <main>
      <button onClick={addOrder}>Add meal to order</button>
        <section className='menu section'>
          <div className='title'>
            <h2>tesla menu</h2>
            <div className='underline'></div>
          </div>
  
          <FilterRestoranItems filterItems={filterItems} categories={categories} />
          <RestoranItems items={menuItems} />
  
        </section>
      </main> );
}
 
export default ViewOrder;