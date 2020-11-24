import React from 'react';
import { useGlobalContext } from './context';



const CartItem = ({ id, note, title, price, amount }) => {

    const { remove } = useGlobalContext();

    return (

        <article className='cart-item'>

            <h4 className='h4-Capitalize'>{title}</h4>
            {/* remove button */}
            <button
                className='filter-btn'
                onClick={() => remove(id)}
            >
                remove
            </button>
            <p className='amount'>{amount}</p>
            <h4 className='item-price'>{price} din</h4>

            <div>
                < p className='cart-note'>{note}</p>
            </div>


        </article>
    );
};

export default CartItem;
