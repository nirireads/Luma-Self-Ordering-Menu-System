import React, { useState , useContext} from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../contexts/mainContext";

function BottomNavbar() {
  const [activeLink, setActiveLink] = useState("menu");

  return (
    <ul
      className="nav nav-pills nav-fill fixed-bottom"
      style={{
        backgroundColor: "white",
        height: "6rem",
        position: "fixed",
        bottom: -35,
        border: "1px solid black",
      }}
    >
    
      <li className="nav-item p-2">
        <Link
          className={`nav-link ${
            activeLink === "menu" ? "active bg-dark" : ""
          }`}
          to="/"
          onClick={() => setActiveLink("menu")}
        >
          <i
            className="fa fa-cutlery"
            aria-hidden="true"
            style={{ color: "orange" }}
          ></i>
        </Link>
      </li>

   
      <li className="nav-item p-2">
        <Link
          className={`nav-link ${
            activeLink === "order" ? "active bg-warning bg-dark" : ""
          }`}
          to="/order"
          onClick={() => setActiveLink("order")}
        >
          <i
            className="fa fa-shopping-basket"
            aria-hidden="true"
            style={{ color: "orange" }}
          ></i>
        </Link>
      </li>

    
      <li className="nav-item p-2">
        <Link
          className={`nav-link ${
            activeLink === "user" ? "active bg-warning bg-dark" : ""
          }`}
          to="/user"
          onClick={() => setActiveLink("user")}
        >
          <i
            className="fa fa-user"
            aria-hidden="true"
            style={{ color: "orange" }}
          ></i>
        </Link>
      </li>
    </ul>
  );
}

export default BottomNavbar;
