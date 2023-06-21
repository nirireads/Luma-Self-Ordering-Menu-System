import React, { createContext, useState } from "react";
import AdminPage from "../pages/container/AdminPage";
export const MainContext = createContext();

const ContextApp = () => {

  let [activeNavbar, setActiveNavbar] = useState("home");

  let contextData = {
    activeNavbar, setActiveNavbar,
 
  };
  return (
    <MainContext.Provider value={contextData}>
      <AdminPage />
    </MainContext.Provider>
  );
};

export default ContextApp;
