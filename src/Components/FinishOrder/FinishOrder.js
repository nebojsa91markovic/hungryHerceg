import React from "react";

const FinishOrder = () => {
  return (
    <ReactFragment>
      <table>
        <tr>
          <th>Redni broj</th>
          <th>Ime</th>
          <th>Hrana</th>
          <th>Kolicina</th>
          <th>Napomena</th>
        </tr>

        <tr>
          <td>1</td>
          <td>John Doe</td>
          <td>pizza</td>
          <td>1</td>
          <td>kecap</td>
        </tr>

        <tr>
          <td>2</td>
          <td>John Doe</td>
          <td>pizza</td>
          <td>1</td>
          <td>kecap</td>
        </tr>
      </table>
      <button>Print order</button>
    </ReactFragment>
  );
};

export default FinishOrder;
