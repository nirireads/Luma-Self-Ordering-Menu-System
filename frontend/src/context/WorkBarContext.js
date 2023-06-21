import React, { createContext, useState, useEffect, useContext } from "react";
import WorkBar from "../pages/container/WorkBar";
import { AuthContext } from "./AuthContext";

export const WorkBarContext = createContext();

const WorkBarContextApp = () => {
  const { API_ENDPOINT } = useContext(AuthContext);

  const [activeOrderStatus, setActiveOrderStatus] = useState("Order");
  const [selectedTable, setSelectedTable] = useState();
  const [orderTableStatus, setOrderTableStatus] = useState();
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeMenuCat, setActiveMenuCat] = useState("");
  const [dishes, setDishes] = useState([]);
  const [editItem, setEditItem] = useState({
    name: "",
    price: "",
    menuCategory: "",
    status: "",
    description: "",
    cover: null
  });


  const [waiters, setWaiters] = useState([]);
  const [editWaiter, setEditWaiter] = useState({
    username: "",
    password: "",
    contact_no: "",
    is_active: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableResponse = await fetch(API_ENDPOINT + "api/gettable/");
        const tableData = await tableResponse.json();
        setTables(tableData);

        const orderResponse = await fetch(API_ENDPOINT + "api/getorder/");
        const orderData = await orderResponse.json();
        setOrders(orderData);

        const menuItemsResponse = await fetch(API_ENDPOINT + "api/dish/");
        const menuItemsData = await menuItemsResponse.json();
        setMenuItems(menuItemsData);

        const waiterResponse = await fetch(API_ENDPOINT + "api/waiter/");
        const waiterData = await waiterResponse.json();
        setWaiters(waiterData);

        // ... additional fetches for other data

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const getOrderTime = (tableNo) => {
    const orderTable = tables.find((table) => table.table_no === tableNo);
    const order = orders.find((order) => order.table === orderTable.id);
    if (order) {
      const datetimeString = order.order_time;
      const dateObj = new Date(datetimeString);
      const timeString = dateObj.toLocaleTimeString([], { timeStyle: "short" });
      return timeString;
    }
    return null;
  };

  const contextData = {
    API_ENDPOINT,
    activeOrderStatus,
    setActiveOrderStatus,
    activeMenuCat,
    setActiveMenuCat,
    dishes,
    setDishes,
    editItem,setEditItem,
    selectedTable,setSelectedTable,
    orderTableStatus,setOrderTableStatus,
    tables,setTables,
    orders,setOrders,
    menuItems,
    setMenuItems,
    getOrderTime,
    waiters, setWaiters,
    editWaiter, setEditWaiter
  };

  return (
    <WorkBarContext.Provider value={contextData}>
      <WorkBar />
    </WorkBarContext.Provider>
  );
};

export default WorkBarContextApp;
