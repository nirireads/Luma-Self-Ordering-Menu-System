import React, { useContext, useEffect } from "react";
import { WorkBarContext } from "../context/WorkBarContext";
import "./styles/invoice.css";

function Invoice() {
  const { orders, menuItems, setOrders, selectedTable, tables, setTables, API_ENDPOINT } = useContext(WorkBarContext);

  useEffect(() => {
    const table = tables.find((table) => table.table_no === selectedTable);
    if (table && table.state === "Dining" && table.order_state === "Served") {
      const filteredOrders = orders.filter((order) => order.table === table.id);

      filteredOrders.forEach((order) => {
        const menuItem = menuItems.find((item) => item.id === order.menu_item);
        totalPrice += menuItem.price * order.counter;
      });
    }
  }, [orders, menuItems, selectedTable, tables]);

  const addDataToDatabase = async (order) => {
    try {
      console.log(order);
      const response = await fetch(API_ENDPOINT + "api/order-backup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Failed to add data to the database");
      }

      console.log("Data added successfully");
    } catch (error) {
      console.error(error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };

  const handleChange = () => {
    const table = tables.find((table) => table.table_no === selectedTable);
    if (table && table.state === "Dining" && table.order_state === "Served") {
      const updatedOrders = orders.filter((order) => order.table !== table.id);
      const backedOrders = orders.filter((order) => order.table === table.id);
      setOrders(updatedOrders);

      backedOrders.forEach((order) => {
        addDataToDatabase(order);
        deleteOrder(order.id);
      });

      table.order_state = "All";
      alert("Button clicked!");

      fetch(API_ENDPOINT + `api/table/update/${table.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newOrderState: "All",
          newState: "Empty"
        }),
      })
        .then((response) => response.json())
        .then((data) =>
          fetch(API_ENDPOINT + "api/gettable/")
            .then((response) => response.json())
            .then((data) => setTables(data))
        );
    } else {
      alert("Error updating.");
    }
  };

  const deleteOrder = (orderId) => {
    fetch(API_ENDPOINT + `api/delete-order/${orderId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message
        console.log("Order deleted successfully.");
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error deleting order:", error);
      });
  };


  const table = tables.find((table) => table.table_no === selectedTable);
  let totalPrice = 0;
  let orderItem = null;
  if (table && table.state === "Dining" && table.order_state === "Served") {
    const filteredOrders = orders.filter((order) => order.table === table.id);
    orderItem = filteredOrders.map((order) => {
      const menuItem = menuItems.find((item) => item.id === order.menu_item);
      const subtotal = menuItem.price * order.counter;
      totalPrice += subtotal;

      return (
        <tr className="row-data" key={order.id}>
          <td className="item-desc">{menuItem.name}</td>
          <td className="item-price">{menuItem.price}</td>
          <td className="item-quantity">{order.counter}</td>
          <td className="item-total">{menuItem.price * order.counter}</td>
        </tr>
      );
    });
  }

  const tableContent = table && table.state === "Dining" && table.order_state === "Served" ? (
    <tbody>{orderItem ? orderItem : <h5 style={{ textAlign: "center", marginLeft: "150px" }}>No Item Found: Select Table</h5>}</tbody>
  ) : null;

  return (
    <div className="center invoice-container">
      <div className="r2-container">
        <div className="inner-container">
          <div className="title center">
            <h2>Invoice:  {selectedTable ? <span>{selectedTable}</span> : ""}</h2>
          </div>

          <div className="tableWrap">
            <table>
              <thead>
                <tr className="row-heading">
                  <th className="item-desc">Dish</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Amount</th>
                </tr>
              </thead>
              {tableContent}
              <tfoot>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>Grand Total:</td>
                  <td className="total">{totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="btn-container center flex-row">
            <button onClick={handleChange}>Paid</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
