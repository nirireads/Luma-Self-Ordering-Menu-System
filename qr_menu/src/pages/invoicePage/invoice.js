import React, { useState, useContext, useEffect } from "react";
import "./styles/invoice.css";
import { MainContext } from "../../contexts/mainContext";

function Invoice() {
  const { API_ENDPOINT, tableNo } = useContext(MainContext);
  const [invoiceOrder, setInvoiceOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [firstOrderTime, setFirstOrderTime] = useState("");
  const [firstOrderDate, setFirstOrderDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceState, setInvoiceState] = useState("Unconfirmed");

  useEffect(() => {
    fetch(API_ENDPOINT + `api/customer_orders_table/?table=${tableNo}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("invoice", response);
        return response.json();
      })
      .then(async (data) => {
        // Fetch and associate dish information with each order
        const updatedOrders = await Promise.all(
          data.map(async (order) => {
            try {
              const dishResponse = await fetch(
                API_ENDPOINT + `api/dish/${order.menu_item}`
              );
              if (!dishResponse.ok) {
                throw Error("Error fetching dish information");
              }
              const dishData = await dishResponse.json();
              return { ...order, dish: dishData };
            } catch (error) {
              console.error("Error fetching dish information:", error);
              return { ...order, dish: null }; // Include a placeholder for dish
            }
          })
        );

        // Calculate the total price and get the first order time
        let total = 0;
        console.log("updated order s fina", updatedOrders);
        if (updatedOrders.length > 0) {
          total = updatedOrders.reduce(
            (acc, order) => acc + order.dish.price * order.counter,
            0
          );
          const firstOrder = updatedOrders[0];

          // Parse the ISO format date and time string
          const orderTime = new Date(firstOrder.order_time);

          // Format the date and time as needed (adjust the format as per your preference)
          const firstTime = orderTime.toLocaleTimeString();
          const firstDate = orderTime.toLocaleDateString();
          const firstInvoiceId = updatedOrders[0].id;

          setTotalPrice(total);
          setFirstOrderTime(firstTime);
          setFirstOrderDate(firstDate);
          setInvoiceNo(firstInvoiceId);
          setInvoiceOrder(updatedOrders);
          setInvoiceState("Confirmed");
        } else {
          setInvoiceState("UnConfirmed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tableNo, API_ENDPOINT]);

  return (
    <>
      <div className="invoice-container">
        <div className="invoice-header">
          <div className="invoice-number">
            <span className="table-label">Invoice</span> #{invoiceNo}
          </div>
          <div className="ordered-time">
            <span className="table-label">Ordered Time:</span> {firstOrderTime}
          </div>
        </div>
        <div className="invoice-heading">Order Invoice</div>
        <div className="invoice-details">
          <div className="table-details">
            <div className="table-number">
              <span className="table-label">Table No:</span> {tableNo}
            </div>
            <div className="table-date">
              <span className="table-label">Date:</span>
              {firstOrderDate}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="fixTableHeadScroll">
          <table className="invoice-items">
            <thead>
              <tr>
                <th>Ordered Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="scrollable-table">
              {invoiceOrder.map((item, index) => (
                <tr key={index}>
                  <td>{item.dish.name}</td>
                  <td>{item.counter}</td>
                  <td>{item.dish.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-status">
          <span style={{ fontWeight: "bold" }}>Order Status: </span>
          <span className="order-stat">{invoiceState}</span>
        </div>
        <div className="total-row">
          <span style={{ fontWeight: "bold" }}>
            Total:
            <span style={{ fontWeight: "bold", color: "green" }}>
              {" "}
              Rs. {totalPrice}{" "}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Invoice;
