import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/OrderPage.css";
import TableComponent from "../../component/tableComponent";
import EmptyTableComponent from "../../component/emptyTableComponent";
import { WorkBarContext } from "../../context/WorkBarContext";

function OrderPage() {
  const {
    activeOrderStatus,
    setActiveOrderStatus,
    setSelectedTable,
    tables,
    getOrderTime,
    setOrderTableStatus,
  } = useContext(WorkBarContext);

  const filteredTableOrder =
    activeOrderStatus === "All"
      ? tables
      : tables.filter((table) => table.order_state === activeOrderStatus);

  const handleSelectedTable = (tableNo, orderState) => {
    setSelectedTable(tableNo);
    setOrderTableStatus(orderState);
  };

  const menuCategories = [
    { label: "All", category: "All" },
    { label: "Order", category: "Order" },
    { label: "Cook", category: "Cook" },
    { label: "Prepared", category: "Prepared" },
    { label: "Served", category: "Served" },
  ];

  return (
    <div className="admin-order-container">
      <h1 className="title">Order Listing</h1>
      <nav className="sort">
        <ul className="nav nav-pills">
          {menuCategories.map(({ label, category }) => (
            <li className="nav-item" key={category}>
              <Link
                className={`nav-link ${
                  activeOrderStatus === category ? "active" : ""
                }`}
                to="#"
                onClick={() => setActiveOrderStatus(category)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="order-table">
        {filteredTableOrder.length > 0 ? (
          filteredTableOrder.map((item) => (
            <div className="table-box" key={item.table_no}>
              <Link
                to="/order"
                key={item.id}
                onClick={() =>
                  handleSelectedTable(item.table_no, item.order_state)
                }
              >
                {item.state === "Empty" ? (
                  <TableComponent
                    tableNumber={String(item.table_no).padStart(2, "0")}
                    tableState={item.state}
                    orderTime={getOrderTime(item.table_no)}
                  />
                ) : (
                  <EmptyTableComponent
                    tableNumber={String(item.table_no).padStart(2, "0")}
                    tableState={item.state}
                    orderTime={getOrderTime(item.table_no)}
                  />
                )}
              </Link>
            </div>
          ))
        ) : (
          <div className="no-tables">
            <p>No Tables Here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
