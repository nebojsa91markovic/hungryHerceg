import React from "react";
import OrdersCollection from "../../collections/OrdersCollection";
import { ExportCSV } from "../../services/ExportCSV";
import { v4 as uuidv4 } from "uuid";

import numeral from "../../services/numeral";
numeral.locale("srb");

function AllOrders({ items, orderId }) {
  const finishOrder = () => {
    let orderFinish = window.confirm("Do you wish to finish the order now?");

    if (orderFinish) {
      OrdersCollection.doc(orderId)
        .update({
          active: false,
        })
        .then(() => {
          alert("Order is now finished");
        });
    }
  };

  return (
    <div className="menu section">
      <div onClick={finishOrder}>
        <ExportCSV csvData={items} fileName={"First Order"} />
      </div>
      <table className="all-orders">
        <tbody>
          <tr key={uuidv4()}>
            <th>No</th>
            <th>User</th>
            <th>Food</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Price</th>
          </tr>

          {items.map((menuItem) => {
            const { id, name, note, amount, price, user, num } = menuItem;

            return (
              <tr key={uuidv4()}>
                <td>{num}</td>
                <td>{user}</td>
                <td>{name}</td>
                <td>{amount}</td>
                <td>{note}</td>
                {/* <td>{price}</td> */}
                <td>{numeral(price).format("$ 0,0.00")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllOrders;
