import React, { useContext } from "react";

import MenuPage from "../menu/MenuPage";
import OrderPage from "../order/OrderPage";
import Waiter from "../waiter/Waiter";
import Restaurant from "../restaurant/Restaurant";

import { MainContext } from "../../context/MainContext";

function MiddleContainer() {
  let { activeNavbar } = useContext(MainContext);

  return (
    <div className="middleContainer">
      <>
        {activeNavbar === "home" ? (
          <OrderPage />
        ) : activeNavbar === "menu" ? (
          <MenuPage />
        ) : activeNavbar === "waiter" ? (
          <Waiter />
        ) : activeNavbar === "settings" ? (
          <Restaurant />
        ) : (
          <OrderPage />
        )}
      </>
    </div>
  );
}

export default MiddleContainer;
