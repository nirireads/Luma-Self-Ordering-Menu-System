import React, { useContext } from "react";
import { WorkBarContext } from './../../context/WorkBarContext';
import TableComponent from "../../component/tableComponent";
import "./styles/Restaurant.css";

const Restaurant = () => {
  let { setSelectedTable, tables } = useContext(WorkBarContext);
  const handleTable = (tableno) => {
    setSelectedTable(prevSelectedTable => prevSelectedTable !== tableno ? tableno : null);
    console.log(tableno);
  };

  return (
    <div className="restaurant-container">
      <div className="row title"> Table QR:</div>
      <div className="row restaurant-table">
        {tables.map((item) => {
          return (
            <div key={item.id} onClick={() => handleTable(item.table_no)} className="qrTable">
              <TableComponent
                tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
                tableState="QR"
              />
            </div>

          );
        })}
      </div>
    </div>
  );
};

export default Restaurant;
