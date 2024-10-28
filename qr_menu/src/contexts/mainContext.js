import React, { createContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const MainContext = createContext();

const ContextApp = ({ children }) => {
  // const API_ENDPOINT = "http://127.0.0.01:8000/";
  const API_ENDPOINT = "http://192.168.1.72:8000/";
  const [activeCat, setActiveCat] = useState("all");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [tableNo, setTableNo] = useState();
  const [cartNo, setCartNo] = useState(0);

  // Use useEffect to run code when the component mounts
  useEffect(() => {
    // Get the query parameter string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableNumber = urlParams.get("tableNumber");

    // Check if tableNumber exists and set it in state
    if (tableNumber) {
      setTableNo(tableNumber);

      // Store the tableNumber and its expiration time in local storage
      const now = new Date().getTime();
      const expirationTime = now + 90 * 60000; // Set your desired expiration time in milliseconds
      localStorage.setItem("tableNumber", tableNumber);
      localStorage.setItem("tableNumberExpiration", expirationTime.toString());
    }

    // Retrieve the tableNumber and expiration time from local storage
    const storedTableNumber = localStorage.getItem("tableNumber");
    const storedExpirationTime = localStorage.getItem("tableNumberExpiration");

    if (storedTableNumber && storedExpirationTime) {
      const expirationTime = parseInt(storedExpirationTime, 10);

      if (expirationTime > new Date().getTime()) {
        // The tableNumber is still valid
        const validTableNumber = storedTableNumber;
        setTableNo(validTableNumber);
        // Use validTableNumber in your application
      } else {
        // The tableNumber has expired, remove it from local storage
        localStorage.removeItem("tableNumber");
        localStorage.removeItem("tableNumberExpiration");
      }
    }
  }, []); // Empty dependency array to run this code only once

  useEffect(() => {
    const storedTableNumber = localStorage.getItem("tableNumber");
    if (!fetchCustomerOrdersByTable(storedTableNumber)) {
      return <Redirect to="/error" />;
    }
  });

  const fetchCustomerOrdersByTable = async (tableNo) => {
    try {
      // Fetch customer orders for the specified table number
      const response = await fetch(
        `${API_ENDPOINT}api/customer_orders_table/?table=${tableNo}`
      );

      if (response.ok) {
        const data = await response.json();
        // Update cartNo based on the length of orders
        setCartNo(data.length);
      } else {
        // Handle the case where the request failed
        console.error("Failed to fetch customer orders:", response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error fetching customer orders:", error);
    }
  };

  let contextData = {
    API_ENDPOINT,
    activeCat,
    setActiveCat,
    filteredMenu,
    setFilteredMenu,
    tableNo, // Make tableNo available in context
    cartNo,
    fetchCustomerOrdersByTable,
  };

  return (
    <MainContext.Provider value={contextData}>{children}</MainContext.Provider>
  );
};

export default ContextApp;
