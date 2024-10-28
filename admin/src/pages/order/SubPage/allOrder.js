import React, { useEffect, useState, useContext } from "react";
import "../styles/allOrder.css";

import { AuthContext } from "../../../context/AuthContext";

import TableStat from "../component/TableStat";
import OrderSummary from "../component/OrderSummary";
import TotalSales from "../component/TotalSales";
import PopularItem from "../component/PopularItem";

const AllOrder = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filterType, setFilterType] = useState("frequency");
  const [month, setMonth] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { API_ENDPOINT } = useContext(AuthContext);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        let url = `${API_ENDPOINT}api/popular-items/${filterType}/${month}/${currentYear}`;
        const response = await fetch(url);
        const data = await response.json();
        setPopularItems(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        let url = `${API_ENDPOINT}api/total-revenue/${month}/${currentYear}`;
        const response = await fetch(url);
        const data = await response.json();
        setTotalRevenue(data.total_revenue);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPopularItems();
    fetchTotalRevenue();
  }, [filterType, month, currentYear, API_ENDPOINT]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
    setMonth(currentMonth);
  }, []);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    // <div class="grid-container">
    //     <div class="grid-item item1">
    //         <PopularItem
    //             popularItems={popularItems}
    //             month={month}
    //             months={months}
    //             filterType={filterType}
    //             handleFilterTypeChange={handleFilterTypeChange}
    //             handleMonthChange={handleMonthChange}
    //         />
    //     </div>
    //     <div class="grid-item item2">
    //         <TotalSales totalRevenue={totalRevenue} month={month} />
    //     </div>
    //     <div class="grid-item item3">
    //         <TableStat />
    //     </div>
    //     <div class="grid-item item4">
    //         <OrderSummary />
    //     </div>
    // </div>
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="box-1">
          <div className="pop-item">
            <PopularItem
              popularItems={popularItems}
              handleFilterTypeChange={handleFilterTypeChange}
              month={month}
              months={months}
              filterType={filterType}
              handleMonthChange={handleMonthChange}
            />
          </div>
          <div className="stat">
            <TableStat />
          </div>
        </div>
        <div className="box-2">
          <div className="rev">
            <TotalSales totalRevenue={totalRevenue} month={month} />
          </div>
          <div className="sum">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrder;
