import React, { useState } from "react";
import { Link } from "react-router-dom";

function BottomNavbar() {
  const [activeLink, setActiveLink] = useState("home");

  return (
    <ul
      className="nav nav-pills nav-fill fixed-bottom"
      style={{
        backgroundColor: "white",
        height: "6rem",
        position: "fixed",
        bottom: -35,
        border: "1px solid pink",
      }}
    >
    
      <li className="nav-item p-2">
        <Link
          className={`nav-link ${
            activeLink === "home" ? "active bg-dark" : ""
          }`}
          to="/"
          onClick={() => setActiveLink("home")}
        >
          <i
            className="fa fa-cutlery"
            aria-hidden="true"
            style={{ color: "orange" }}
          ></i>
        </Link>
      </li>

   

   {/* Middle Nav */}
      <li className="nav-item p-2">
        <Link
          className={`nav-link ${
            activeLink === "order" ? "active bg-warning bg-dark" : ""
          }`}
          to="/viewTable"
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
