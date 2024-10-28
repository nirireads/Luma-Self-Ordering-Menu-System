import React from "react";
import "./styles/tableComponent.css";

function TableComponent({ tableNumber, tableState }) {
  return (
    <div className="table-component">
      <button className="table-button">
        <div className="table-top">
          <div className="table-number">{tableNumber}</div>
        </div>
        <div className="table-middle">{tableState}</div>
        <div className="table-bottom"></div>
      </button>
    </div>
  );
}

export default TableComponent;
