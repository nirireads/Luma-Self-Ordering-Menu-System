import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const MainContext = createContext();

const ContextApp = ({ children }) => {
  const { API_ENDPOINT } = useContext(AuthContext);

  const [selectedTable, setSelectedTable] = useState();
  const [orderTable, setOrderTable] = useState();
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET TABLE
        const response1 = await fetch(API_ENDPOINT + "api/gettable/");
        const data1 = await response1.json();
        setTables(data1);

        // GET ORDERS
        const response2 = await fetch(API_ENDPOINT + "api/getorder/");
        const data2 = await response2.json();
        setOrders(data2);

        // GET ORDERED ITEMS
        const response3 = await fetch(API_ENDPOINT + "/api/dish");
        const data3 = await response3.json();
        setMenuItems(data3);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getOrderTime = (tableNo) => {
    const order = orders.find((order) => order.table === tableNo);
    if (order) {
      const datetimeString = order.order_time;
      const dateObj = new Date(datetimeString);
      const timeString = dateObj.toLocaleTimeString([], { timeStyle: "short" });
      return timeString;
    }
    return null;
  };

  let contextData = {
    API_ENDPOINT,
    selectedTable,
    setSelectedTable,
    orderTable,
    setOrderTable,
    tables,
    setTables,
    orders,
    setOrders,
    menuItems,
    setMenuItems,
    getOrderTime,
  };
  
  return (
    <MainContext.Provider value={contextData}>
      {children}
    </MainContext.Provider>
  );
};

export default ContextApp;
