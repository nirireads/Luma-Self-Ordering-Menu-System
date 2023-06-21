import React, { useContext } from "react";

import { WorkBarContext } from './../../context/WorkBarContext';
import "./styles/r_OrderPage.css";



import AllOrder from "./SubPage/allOrder";
import Ordering from "./SubPage/subOrder";
import Preparing from "./SubPage/subCook";
import Prepared from "./SubPage/subPrepared";
import Invoice from './../../component/invoice';

function R_OrderPage() {
  let { activeOrderStatus } = useContext(WorkBarContext);

  return (
    <>
      {
        activeOrderStatus === 'All' ? <AllOrder /> :
          (activeOrderStatus === 'Order' ? <Ordering /> :
            (activeOrderStatus === 'Cook' ? <Preparing /> :
              (activeOrderStatus === 'Prepared' ? <Prepared /> :
                (activeOrderStatus === 'Served') ? <Invoice /> : ""
              )))
      }
    </>
  );
};

export default R_OrderPage;
