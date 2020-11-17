import React from 'react';

const ViewPoll = () => {
    return ( <div className="polls">
        <form>
            <h3>Where do you want to eat /radna subota/ </h3>
            <div className="restaurantList">
                <label>Ime restorana</label>
                <input type="radio" />
                <label>Ime restorana2</label>
                <input type="radio" />
                <label>Ime restorana3</label>
                <input type="radio" />
                <label>Ime restorana4</label>
                <input type="radio" />
            </div>
            <input type="submit" />
        </form>
    </div> );
}
 
export default ViewPoll;