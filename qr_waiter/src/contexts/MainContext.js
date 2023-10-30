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
        const [tableResponse, orderResponse, menuResponse] = await Promise.all([
          fetch(API_ENDPOINT + "api/gettable/").then((response) => response.json()),
          fetch(API_ENDPOINT + "api/getorder/").then((response) => response.json()),
          fetch(API_ENDPOINT + "/api/dish").then((response) => response.json()),
        ]);

        setTables(tableResponse);
        setOrders(orderResponse);
        setMenuItems(menuResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [API_ENDPOINT]);

  const getOrderTime = (tableNo) => {
    const order = orders.find((order) => order.table === tableNo);
    return order ? new Date(order.order_time).toLocaleTimeString([], { timeStyle: "short" }) : null;
  };

  const contextData = {
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
