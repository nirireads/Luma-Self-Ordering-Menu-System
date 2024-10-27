import React, { useContext } from "react";

import { MainContext } from "../../context/MainContext";
import { WorkBarContext } from "../../context/WorkBarContext";

import R_OrderPage from "../order/r_OrderPage";
import R_MenuPage from "../menu/r_MenuPage";
import R_Restaurant from "../restaurant/r_Restaurant";
import R_EditMenu from "../menu/r_EditMenu";
import R_Waiter from "../waiter/r_Waiter";
import EditWaiter from "../waiter/EditWaiter";

function RightContainer() {
  let { activeNavbar } = useContext(MainContext);
  let { editItem, editWaiter } = useContext(WorkBarContext);

  return (
    <div className="rightContainer">
      <>
        {activeNavbar === "home" ? (
          <R_OrderPage />
        ) : activeNavbar === "menu" ? (
          editItem ? (
            <R_EditMenu />
          ) : (
            <R_MenuPage />
          )
        ) : activeNavbar === "waiter" ? (
          editWaiter ? (
            <EditWaiter />
          ) : (
            <R_Waiter />
          )
        ) : activeNavbar === "settings" ? (
          <R_Restaurant />
        ) : (
          <R_OrderPage />
        )}
      </>
    </div>
  );
}

export default RightContainer;
