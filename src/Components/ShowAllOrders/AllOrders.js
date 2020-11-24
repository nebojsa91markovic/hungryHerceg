import React, { useState } from "react";
import { ExportCSV } from "../../services/ExportCSV";
function AllOrders({ items }) {
  return (
    <div className="menu section">
      <ExportCSV csvData={items} fileName={"First Order"} />
      <table className="all-orders">
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
    </div>
  );
}

export default AllOrders;
