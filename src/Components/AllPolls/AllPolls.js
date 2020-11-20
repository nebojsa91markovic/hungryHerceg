import React from 'react';
import PollsCollection from "../../collections/PollsCollection"

const AllPolls = () => {

    const getAllPolls = () => {
        let allPolls = [];
        PollsCollection.get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              allPolls.push(doc.data());
            });
            console.log(allPolls);
          });
    }
  
    return ( 
        <div className="allPolls">
            <ul>
                <li>Anketa 1</li>
                <li>Anketa 2</li>
                <li>Order 1 
                </li>
                <button>Zavrsi order</button>
            </ul>
        </div> );
}
 
export default AllPolls;