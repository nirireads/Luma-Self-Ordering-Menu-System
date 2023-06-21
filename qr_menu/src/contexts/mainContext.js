import React, { createContext, useState } from "react";

import Menu from "../components/menu";
export const MainContext = createContext();

const ContextApp = () => {
  const [activeCat, setActiveCat] = useState("all");
  const [filteredMenu, setFilteredMenu] = useState([]);


  let contextData = {
    activeCat: activeCat,
    setActiveCat: setActiveCat,
    filteredMenu:filteredMenu,
    setFilteredMenu:setFilteredMenu
  };
  return (
    <MainContext.Provider value={contextData}>
      <Menu />
    </MainContext.Provider>
  );
};

export default ContextApp;
