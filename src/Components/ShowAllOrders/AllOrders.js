import React, { useState } from 'react';

function AllOrders({ items }) {

    return <div className='menu section'>
        <table className='all-orders'>
            <tr>
                <th>User</th>
                <th>Food</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Price</th>
            </tr>

            {items.map((menuItem) => {
                const { id, name, note, amount, price, user } = menuItem;

                return (
                    <tr>
                        <td>{user}</td>
                        <td>{name}</td>
                        <td>{amount}</td>
                        <td>{note}</td>
                        <td>{price}</td>
                    </tr>
                );
            })}

        </table>

    </div >;

}

export default AllOrders;