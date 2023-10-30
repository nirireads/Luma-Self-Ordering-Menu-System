import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../contexts/mainContext";
import ErrorDialog from './../../components/errorDialog';

function MenuCard() {
  const { filteredMenu, setFilteredMenu, API_ENDPOINT, tableNo,  fetchCustomerOrdersByTable } = useContext(MainContext);

  const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
  };

  const closeErrorDialog = () => {
    setError(null);
  };

  useEffect(() => {
    fetch(API_ENDPOINT + "api/dish/")
      .then((response) => response.json())
      .then((data) => setFilteredMenu(data))
      .catch((error) => console.log(error));

  }, [setFilteredMenu, API_ENDPOINT]);

  const handleOrderAdd = (menuItem) => {
    const orderData = {
      table: tableNo,
      menuItem: menuItem.id,
      quantity: 1,
    };

    fetch(API_ENDPOINT + 'api/customer_orders/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Order added successfully');
          fetchCustomerOrdersByTable(tableNo);
        } else {
          throw new Error(`Failed to add order: ${response.statusText}`);
        }
      })
      .catch((error) => {
        handleError("Order Adding Failed. Please Scan QR code Again.");
        console.error(error);
      });
  };




  return (
    <>
      {filteredMenu &&
        filteredMenu.map((item) => {
          return (
            <div
              className="card m-4"
              style={{
                borderRadius: "25px",
                width: "max",
                marginBottom: "6rem"
              }}
              key={item.id}
            >
              {/* Row 1 - Image */}
              <div className="row">
                <div className="col my-3 mx-3">
                  <img
                    src={API_ENDPOINT + item.cover}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      maxWidth: "max",
                      maxHeight: "250px",
                      // minWidth: "200px",
                      minHeight: "250px",
                      objectFit: "cover",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      borderRadius: "15px",
                    }}
                  />
                </div>
              </div>

              {/* Row 2 --> Description */}
              <div className="row">
                <div className="col">

                  {/*  Column 1 -> title */}
                  <div className="row">
                    <div
                      className="card-title col my-1 mx-4"
                      style={{
                        textAlign: "left",
                        fontFamily: "Garamond, serif",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="row">
                    <div
                      className="col mb-4 mx-4"
                      style={{
                        fontFamily: "Garamond, serif",
                        color: "darkgreen",
                        textAlign: "left",
                        fontSize: "1rem",
                        fontWeight: "500",
                      }}
                    >
                      <div>
                        <span>Rs. {item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <button
                    style={{
                      background: "darkgreen", color: "white",
                      fontSize: "1rem",
                      fontWeight: "500", padding: "8px 18px",
                      borderRadius: "10px", marginTop: "10px"
                    }}
                    onClick={() => handleOrderAdd(item)}
                  >Add</button>
                </div>
              </div>

              {error && <ErrorDialog message={error} onClose={closeErrorDialog} />}
            </div>
          );
        })}
    </>
  );
}
export default MenuCard;
