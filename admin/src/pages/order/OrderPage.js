import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./styles/OrderPage.css";
import TableComponent from "../../component/tableComponent";
import EmptyTableComponent from './../../component/emptyTableComponent';
import { WorkBarContext } from './../../context/WorkBarContext';


function OrderPage() {
  let { activeOrderStatus, setActiveOrderStatus } = useContext(WorkBarContext);

  let { setSelectedTable, tables, getOrderTime, setOrderTableStatus } = useContext(WorkBarContext);


  let filteredTableOrder = (activeOrderStatus === 'All') ? tables : tables.filter((table) => table.order_state === activeOrderStatus);

  const handleSelectedTable = (tableno, order_state) => {
    setSelectedTable(tableno);
    setOrderTableStatus(order_state);
  }

  const menuCategories = [
    { label: 'All', category: 'All' },
    { label: 'Order', category: 'Order' },
    { label: 'Cook', category: 'Cook' },
    { label: 'Prepared', category: 'Prepared' },
    { label: 'Served', category: 'Served' },

  ];

  const MenuCategory = ({ label, category, activeOrderStatus, setActiveOrderStatus }) => (
    <li className="nav-item">
      <Link
        className={`nav-link ${activeOrderStatus === category ? 'active' : ''}`}
        to="#"
        onClick={() => setActiveOrderStatus(category)}
      >
        {label}
      </Link>
    </li>
  );



  return (
    <div className="admin-order-container">
      <div className="row title">Order Listing</div>

      <div className="row sort">
        <ul class="nav nav-pills">
          {menuCategories.map((menuCategory) => (
            <MenuCategory
              key={menuCategory.category}
              label={menuCategory.label}
              category={menuCategory.category}
              activeOrderStatus={activeOrderStatus}
              setActiveOrderStatus={setActiveOrderStatus}
            />
          ))}
        </ul>
      </div>

      <div className="row order-table">
        {filteredTableOrder.length > 0 ? (
          filteredTableOrder.map((item) =>
            item.state === "Empty" ? (
              <Link
                to="/order"
                key={item.id}
                onClick={() => handleSelectedTable(item.table_no, item.order_state)}
              >
                <TableComponent
                  tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
                  tableState={item.state}
                  orderTime={getOrderTime(item.table_no)}
                />
              </Link>
            ) : (
              <Link
                to="/order"
                key={item.id}
                onClick={() => handleSelectedTable(item.table_no, item.order_state)}
              >
                <EmptyTableComponent
                  tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
                  tableState={item.state}
                  orderTime={getOrderTime(item.table_no)}
                />
              </Link>
            )
          )
        ) : (
          <div>No Tables Here.</div>
        )}
      </div>


    </div>
  );
};

export default OrderPage;
