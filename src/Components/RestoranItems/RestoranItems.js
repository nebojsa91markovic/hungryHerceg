import React from 'react';

const RestoranItems = ({ items }) => {

  return <div className='section-center'>
    {items.map((menuItem) => {
      const { id, title, img, desc, price } = menuItem;
      return (

        <article key={id} className='menu-item'>
          <img src={img} alt={title} className='photo' />
          <div className="item-info">
            <header>
              <h4>{title}</h4>
              <h4 className="price">${price}</h4>
            </header>
            <p className="item-text">{desc}</p>
            <form>
              <input type='number' name="amount" id="amount" placeholder="1" min="1" max="10" />
              <button className='filter-btn'>Add to cart</button>
              <textarea name="note" id="note" cols="30" rows="2" placeholder="Add your note..."></textarea>
            </form>

          </div>
        </article>
      );
    })}
  </div>;

};

export default RestoranItems;
