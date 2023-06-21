import React, { useState, useEffect, useContext } from "react";
import { OrderContext } from "../contexts/orderContext";
import FoodCard from "./orderCard";

function Order() {
  const { activeCat, setActiveCat } = useContext(OrderContext);
  const [dish, setDish] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [error, setError] = useState(null);
  const ImgUrl = "http://192.168.1.85:8000";

  useEffect(() => {
    fetch("http://192.168.1.85:8000/api/dish/")
      .then((response) => response.json())
      .then((data) => setDish(data))
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    if (activeCat === "all") {
      setFilteredMenu(dish);
    } else {
      const filteredMenu = dish.filter(
        (item) => item.menu_category === activeCat
      );
      setFilteredMenu(filteredMenu);
    }
  }, [activeCat, dish]);

  const buttons = [
    {
      name: "Order",
      value: "order",
    },
    {
      name: "All",
      value: "all",
    },
    {
      name: "Appetizers",
      value: "appetizers",
    },
    {
      name: "Main Course",
      value: "main_course",
    },
    {
      name: "Desserts",
      value: "desserts",
    },
    {
      name: "Beverages",
      value: "beverages",
    },
    {
      name: "Desserts",
      value: "desserts",
    },
    {
      name: "Beverages",
      value: "beverages",
    },
  ];

  const handleCategory = (category) => {
    setActiveCat(category);
  };

  return (
    <div style={{ paddingBottom: "3.5rem" }}>
      <div
        className="btn-group"
        role="group"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
          width: "100%",
          overflowX: "auto",
          border: "1px solid black",
        }}
      >
        {buttons &&
          buttons.map((type, index) => (
            <button
              className="btn btn-outline-warning mx-1 my-2"
              key={index}
              type="button"
              value={type.value}
              onClick={() => handleCategory(type.value)}
              style={{ borderRadius: "25px", padding: ".5rem 1.5rem" }}
            >
              {type.name}
            </button>
          ))}
      </div>

      <h1>{activeCat}</h1>

      {error && <div>Error: {error.message}</div>}
      {!error && filteredMenu.length === 0 && <div>No dishes found.</div>}
      {!error && filteredMenu.length > 0 && (
        <div>
          {filteredMenu.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              image={ImgUrl + item.cover}
              name={item.name}
              counter={item.counter}
         
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
