import React from 'react';

const ViewPoll = () => {
    return ( <div className="polls">
        <form>
            <h3>Where do you want to eat /radna subota/ </h3>
            {/* vote mode */}
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

            {/* view mode */}
            <div className="restaurantList">
                {/* loading polje da se popunjava css Bojan */}
                <label>Ime restorana</label>
                <span>23%</span>
                <label>Ime restorana2</label>
                <span>23%</span>
                <label>Ime restorana3</label>
                <span>23%</span>
                <label>Ime restorana4</label>
                <span>23%</span>
            </div>
            
        </form>
    </div> );
}
 
export default ViewPoll;