import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import dine from "./dine.png";
import "./styles/OrderPage.css";
import ErrorDialog from "../../components/errorDialog";
import { MainContext } from "../../contexts/mainContext";

function Order() {
  const { API_ENDPOINT, tableNo, fetchCustomerOrdersByTable } =
    useContext(MainContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
  };

  const closeErrorDialog = () => {
    setError(null);
  };

  useEffect(() => {
    fetch(API_ENDPOINT + `api/customer_orders_table/?table=${tableNo}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
                throw new Error("Error fetching dish information");
              }
              const dishData = await dishResponse.json();
              return { ...order, dish: dishData };
            } catch (error) {
              console.error("Error fetching dish information:", error);
              handleError(
                "An error occurred while fetching data from the server."
              );
              return { ...order, dish: null }; // Include a placeholder for dish
            }
          })
        );

        console.log("customers order", updatedOrders);
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        handleError("An error occurred while fetching data from the server.");
        // Handle the error gracefully, e.g., display an error message to the user
      });
  }, [setOrders, tableNo, API_ENDPOINT]);

  // Function to update an existing order on the server
  const updateOrderOnServer = (orderId, newCounter) => {
    const orderData = {
      newCounter: newCounter, // Use 'counter' to match your database schema
    };

    fetch(API_ENDPOINT + `api/customer_orders/update/${orderId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Order updated successfully on the server");
        } else {
          throw new Error("Failed to update order on the server");
        }
      })
      .catch((error) => {
        console.error(error);
        handleError("Server Error. Failed to Add Order.");
      });
  };

  const handleOrderAdd = (menuItem) => {
    console.log("menuitem param", menuItem);
    console.log("order", orders);
    const existingOrderIndex = orders.findIndex(
      (order) => order.menu_item === menuItem.menu_item
    );

    console.log("existing order indec", existingOrderIndex);

    if (existingOrderIndex !== -1) {
      const updatedOrders = [...orders];

      console.log("updated order", updatedOrders);

      // Update the order on the server
      updateOrderOnServer(
        updatedOrders[existingOrderIndex].id,
        updatedOrders[existingOrderIndex].counter
      );

      // Update the state with the modified orders array
      setOrders(updatedOrders);
    } else {
      // Handle the case where the order does not exist
      console.log("Order does not exist. Create a new order if needed.");
    }
  };

  const deleteCustomerOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}api/customer_orders/delete/${orderId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Order deleted successfully from the server");
        return true;
      } else {
        console.error("Failed to delete order from the server");
        return false;
      }
    } catch (error) {
      console.error("Error deleting order from the server:", error);
      return false;
    }
  };

  const handleOrderDelete = async (menuItem) => {
    const orderIdToDelete = menuItem.id;

    // Attempt to delete the order from the server
    const serverDeletionSuccessful = await deleteCustomerOrder(orderIdToDelete);

    if (serverDeletionSuccessful) {
      // Filter out the deleted order from the local state
      const updatedOrders = orders.filter(
        (order) => order.id !== orderIdToDelete
      );
      setOrders(updatedOrders);
      fetchCustomerOrdersByTable(tableNo);
    } else {
      // Handle deletion failure, e.g., show an error message
      console.error("Failed to delete order from the server");
    }
  };

  const handleCounterChange = (orderItem, newValue) => {
    // Ensure newValue is a non-negative integer
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue) && intValue >= 0) {
      // Update the counter of the order item
      const updatedOrders = orders.map((order) =>
        order.id === orderItem.id ? { ...order, counter: intValue } : order
      );
      setOrders(updatedOrders);
      fetchCustomerOrdersByTable(tableNo);
    }
  };

  return (
    <div>
      {/* TABLE NUMBER CONTAINER */}
      <div className="order-top-container">
        <div className="order-table">
          <div className="order-table-icon">
            <img src={dine} alt="dining-icon" />
          </div>
          <div className="order-table-content">
            <div className="table-no">Table No</div>
            <div className="selected-table-no">
              {tableNo < 10 ? `0${tableNo}` : tableNo}
            </div>
          </div>
        </div>
      </div>

      {/* MENU ADD DELETE CUSTOMER */}
      {(() => {
        if (tableNo == null) {
          // return <Redirect to="/error" />;
          return <Redirect to="/" />;
        } else {
          return (
            <div className="menu-card">
              <div className="menu-items">
                {orders.map((item) => (
                  <div key={item.id} className="menu-item">
                    {item.dish && item.dish.cover && (
                      <img
                        src={`${API_ENDPOINT}${item.dish.cover}`}
                        className="menu-card-image"
                        alt="loading"
                      />
                    )}
                    <div className="item-info">
                      <span className="menu-card-name">
                        {item.dish ? item.dish.name : "Dish Name Not Available"}
                      </span>{" "}
                      {/* <span className="menu-card-price">{item.dish.price}</span> */}
                      <div className="menu-card-counter">
                        <button
                          className="menu-card-counter-button"
                          onClick={() =>
                            handleCounterChange(item, item.counter - 1)
                          }
                        >
                          <span>-</span>
                        </button>
                        <span className="menu-card-counter-value">
                          {item.counter}
                        </span>
                        <button
                          className="menu-card-counter-button"
                          onClick={() =>
                            handleCounterChange(item, item.counter + 1)
                          }
                        >
                          <span>+</span>
                        </button>
                      </div>
                    </div>
                    <button
                      className="menu-card-add-button"
                      onClick={
                        item.counter > 0
                          ? () => handleOrderAdd(item)
                          : () => handleOrderDelete(item)
                      }
                    >
                      {item.counter > 0 ? (
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })()}

      {error && <ErrorDialog message={error} onClose={closeErrorDialog} />}
    </div>
  );
}

export default Order;
