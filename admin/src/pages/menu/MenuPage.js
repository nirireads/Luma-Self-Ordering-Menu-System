import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/MenuPage.css";

// import { MainContext } from "../../context/MainContext";
import { AuthContext } from "../../context/AuthContext";
import { WorkBarContext } from "../../context/WorkBarContext";

function MenuPage() {
  let { API_ENDPOINT } = useContext(AuthContext);
  let { activeMenuCat, setActiveMenuCat } = useContext(WorkBarContext);
  let { dishes, setDishes, setEditItem } = useContext(WorkBarContext);

  useEffect(() => {
    fetch(API_ENDPOINT + "api/dish/")
      .then((response) => response.json())
      .then((data) => setDishes(data))
      .catch((error) => console.log(error));
  }, [API_ENDPOINT, setDishes]);

  const filteredDishes = activeMenuCat
    ? dishes.filter((dish) => dish.menu_category === activeMenuCat)
    : dishes;

  // Get FROM API
  const menuCategories = [
    { label: "Appetizers", category: "appetizers" },
    { label: "Main Meal", category: "main_course" },
    { label: "Drinks", category: "beverages" },
    { label: "Desserts", category: "desserts" },
  ];

  // Menu Category Navigation JSX
  const MenuCategory = ({
    label,
    category,
    activeMenuCat,
    setActiveMenuCat,
  }) => (
    <li className="nav-item">
      <Link
        className={`nav-link ${activeMenuCat === category ? "active" : ""}`}
        to="#"
        onClick={() => setActiveMenuCat(category)}
      >
        {label}
      </Link>
    </li>
  );

  const handleEdit = (id) => {
    const selectedItem = dishes.find((dish) => dish.id === id);
    setEditItem(selectedItem);
  };

  const handleDelete = (dishId) => {
    let text = "Do you want to Delete Menu?";
    if (window.confirm(text) === true) {
      console.log("Delete Action");
      fetch(API_ENDPOINT + `api/dish/${dishId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Delete successful
            alert("Dish deleted successfully");
            fetch(API_ENDPOINT + "api/dish")
              .then((response) => response.json())
              .then((data) => setDishes(data))
              .catch((error) => console.log(error));
            // Perform any additional actions or update state if needed
          } else {
            // Delete failed
            console.log("Failed to delete dish");
            // Handle the error or show an error message to the user
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle the error or show an error message to the user
        });
    } else {
      console.log("Delete Cancelled");
    }
  };

  return (
    <div className="menu-container">
      <div className="row title"> Menu Listing</div>

      {/* Menu Category Navigation */}
      <div className="row sort">
        <ul className="nav nav-pills">
          {menuCategories.map((menuCategory) => (
            <MenuCategory
              key={menuCategory.category}
              label={menuCategory.label}
              category={menuCategory.category}
              activeMenuCat={activeMenuCat}
              setActiveMenuCat={setActiveMenuCat}
            />
          ))}
        </ul>
      </div>

      {/* menu Cards */}
      <div className="row menu-table">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="menu-item">
            <div className="menu-img">
              <img src={API_ENDPOINT + dish.cover} alt="Menu Item Cover" />
            </div>
            <div className="menu-content">
              <div className="menu-name" style={{ marginBottom: "5px" }}>
                {dish.name}
              </div>
              <div className="menu-price">Rs. {dish.price}</div>
            </div>
            <div className="menu-action">
              <div
                className="action-button"
                onClick={() => handleEdit(dish.id)}
              >
                {" "}
                Edit{" "}
              </div>
              <div
                className="action-button"
                onClick={() => handleDelete(dish.id)}
              >
                {" "}
                Delete{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MenuPage;
