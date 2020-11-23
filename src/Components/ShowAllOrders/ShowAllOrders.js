import React, { useState } from 'react';
import AllOrders from './AllOrders';
import OrderCategories from './OrderCategories';
import items from './allOrdersData';


const allCategories = ['all', ...new Set(items.map((item) => item.category))];
//console.log(allCategories);

function ShowAllOrders() {
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

    return (
        <main>
            <section className='menu section'>
                <div className='title'>
                    <h2>All Orders</h2>
                    <div className='underline'></div>
                </div>

                {/* <OrderCategories filterItems={filterItems} categories={categories} /> */}

                <AllOrders items={menuItems} />
            </section>
        </main>
    );
}

export default ShowAllOrders;