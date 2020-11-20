import React, { useState } from 'react';
import RestoranItems from "../RestoranItems/RestoranItems"
import FilterRestoranItems from "../FilterRestoranItems/FilterRestoranItems"
import items from "./data"
import "./style.css"

const ViewOrder = () => {

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