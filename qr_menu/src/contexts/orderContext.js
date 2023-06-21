import React, { createContext, useState } from "react";

import Order from "../components/order";

export const OrderContext = createContext();

const OrderContextApp = () => {
  const [activeCat, setActiveCat] = useState("all");
  // const [filteredMenu, setFilteredMenu] = useState([]);


  let contextData = {
    activeCat: activeCat,
    setActiveCat: setActiveCat,
    // filteredMenu:filteredMenu,
    // setFilteredMenu:setFilteredMenu
  };
  return (
    <OrderContext.Provider value={contextData}>
      <Order />
    </OrderContext.Provider>
  );
};

export default OrderContextApp;
