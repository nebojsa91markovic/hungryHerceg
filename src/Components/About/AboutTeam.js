import React, { useState } from 'react';

function AboutTeam({ items }) {

    return <div className='section-center'>
        {items.map((menuItem) => {
            const { id, name, img, desc, email } = menuItem;

            return (

                <article key={id} className='menu-item'>
                    <img src={img} alt={name} className='photo' />
                    <div className="item-info">
                        <header>
                            <h4>{name}</h4>
                        </header>

                        <p className="item-text">{desc}</p>
                        <p className="item-text">
                            Contact email: <br></br><a href="mailto:${email}">  {email}</a>
                        </p>

                    </div>
                </article>
            );
        })}
    </div >;

}

export default AboutTeam;