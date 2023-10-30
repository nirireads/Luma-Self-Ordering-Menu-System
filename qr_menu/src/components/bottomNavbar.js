import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../contexts/mainContext";

function BottomNavbar() {
  const [activeLink, setActiveLink] = useState("menu");
  const { cartNo } = useContext(MainContext);

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
          className={`nav-link ${activeLink === "menu" ? "active bg-dark" : ""
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
          className={`nav-link ${activeLink === "order" ? "active bg-warning bg-dark" : ""
            }`}
          to="/order"
          onClick={() => setActiveLink("order")}
        >
          <span style={{ position: 'relative', top: '-10px', right: '-40px', color:"white", background:"orange", padding:"3px 6px",fontSize:"10px", borderRadius:"50px"}}>
            {cartNo}
          </span>
          <i
            className="fa fa-shopping-basket"
            aria-hidden="true"
            style={{ color: "orange" }}
          ></i>
        </Link>
      </li>


      <li className="nav-item p-2">
        <Link
          className={`nav-link ${activeLink === "invoice" ? "active bg-warning bg-dark" : ""
            }`}
          to="/invoice"
          onClick={() => setActiveLink("invoice")}
        >
          <i
            className="fa fa-book"
            aria-hidden="true"
            style={{ color: "orange" }}
          ></i>
        </Link>
      </li>
    </ul>
  );
}

export default BottomNavbar;
