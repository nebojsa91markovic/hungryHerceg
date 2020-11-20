import React from 'react';

const ViewOrderPoll = () => {
    return (

        <div className="polls">
            <form>
                <ul>

                    <li>
                        <input type="checkbox" />
                    Pizza Margarita

                    <span>kolicina</span>
                        <input type="number" />

                        <span>Napomena</span>
                        <input type="text" />
                    </li>

                    <li>
                        <input type="checkbox" />
                    Palacinka Krem plazma

                    <span>kolicina</span>
                        <input type="number" />

                        <span>Napomena</span>
                        <input type="text" />
                    </li>
                </ul>
            </form>
            {/* consumer (localstorage id)
            quantity: input type number
            mealId: checkbox
            napomena: napomena
        */}
        </div>);
}

export default ViewOrderPoll;