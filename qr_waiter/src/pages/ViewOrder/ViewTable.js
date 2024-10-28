import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
// import TableComponent from '../../components/tableComponent';
import EmptyTableComponent from "../../components/emptyTableComponent";
import "./styles/ViewTable.css";

function ViewTable() {
  const { setOrderTable, API_ENDPOINT } = useContext(MainContext);

  const [uniqueTableNumbers, setUniqueTableNumbers] = useState([]);

  useEffect(() => {
    // Fetch unique table numbers from the /customer_order_table endpoint
    fetchUniqueTableNumbers();
  }, []);

  const fetchUniqueTableNumbers = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/customer_orders_table/`
      );
      const orderTableData = await response.json();
      // Create an array to store unique table numbers
      const uniqueTableNumbersArray = [];
      const uniqueTableArray = [];

      // Iterate through the orderTableData to find unique table numbers
      for (const order of orderTableData) {
        const tableNumber = order.table;

        // Check if the table number is already in the uniqueTableNumbersArray
        if (!uniqueTableNumbersArray.includes(tableNumber)) {
          uniqueTableNumbersArray.push(tableNumber);
          uniqueTableArray.push(order);
        }
      }

      setUniqueTableNumbers(uniqueTableArray);
    } catch (error) {
      console.error(error);
      // Handle the error scenario
    }
  };

  const handleSelectedTable = (tableno) => {
    setOrderTable(tableno);
  };

  const getOrderTime = (order_time) => {
    return order_time
      ? new Date(order_time).toLocaleTimeString([], { timeStyle: "short" })
      : null;
  };

  return (
    <div className="viewTable-container">
      <div className="viewTable-title">
        {" "}
        <span>LUMA</span> orders
      </div>
      {uniqueTableNumbers.length === 0 ? (
        <div
          style={{
            fontWeight: "600",
            fontSize: "1rem",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Order To Confirm
        </div>
      ) : (
        <div className="table-container">
          {uniqueTableNumbers.map((item) =>
            item.state === "Empty" ? (
              // <Link to="/viewOrder" key={item.id} onClick={() => handleSelectedTable(item.table_no)}>
              //     <TableComponent
              //         tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
              //         tableState={item.state}
              //     />
              // </Link>
              ""
            ) : (
              <Link
                to="/viewOrder"
                key={item.id}
                onClick={() => handleSelectedTable(item.table)}
              >
                <EmptyTableComponent
                  tableNumber={item.table < 10 ? `0${item.table}` : item.table}
                  tableState="Dining"
                  orderTime={getOrderTime(item.order_time)}
                />
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ViewTable;
