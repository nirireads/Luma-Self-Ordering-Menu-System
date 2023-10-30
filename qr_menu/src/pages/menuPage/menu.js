import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../contexts/mainContext";
import MenuCard from "./menuCard";

function Menu() {
  const { setActiveCat, setFilteredMenu, API_ENDPOINT} = useContext(MainContext);
  const [dish, setDish] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT + "api/dish/")
      .then((response) => response.json())
      .then((data) => setDish(data))
      .catch((error) => console.log(error));

  }, [API_ENDPOINT]);

  const buttons = [
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
    // {
    //   name: "Lunch",
    //   value: "lunch",
    // },
    // {
    //   name: "Shakes",
    //   value: "shakes",
    // },
  ];

  const handleCategory = (category) => {
    setActiveCat(category);
    if (category === "all") {
      setFilteredMenu(dish);
    } else {
      const filteredMenu = dish.filter((item) => item.menu_category === category);
      setFilteredMenu(filteredMenu);
    }
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

      <MenuCard />
    </div>
  );
}

export default Menu;
