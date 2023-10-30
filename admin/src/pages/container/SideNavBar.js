import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import luma from "../../images/luma.jpg";

import { AuthContext } from './../../context/AuthContext';
import { MainContext } from './../../context/MainContext';

function SideNavBar() {
  let { activeNavbar, setActiveNavbar } = useContext(MainContext);
  let { logoutUser } = useContext(AuthContext);


  const handleLogout = () => {
    let text = "Do you want to Logout?";
    if(window.confirm(text) == true){
      logoutUser()
    }else{
      console.log("Logout Cancelled");
    }
  }

  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className={`nav-item  ${activeNavbar === "logo" ? "active" : ""}`}>
          <Link className="nav-link" to="/" onClick={() => setActiveNavbar("logo")}>
            <img src={luma} alt="Restaurant Logo" />
          </Link>
        </li>

{/* Home */}
        <li
          className={`nav-item tool-tip ${activeNavbar === "home" ? "active" : ""}`}
        >
          <Link className="nav-link" to="#" onClick={() => setActiveNavbar("home")}>
            <i class="fa fa-home fa-fw" aria-hidden="true"></i>
          </Link>
          <span className="tooltiptext">Home</span>
        </li>

{/* Menu */}
        <li
          className={`nav-item tool-tip ${activeNavbar === "menu" ? "active" : ""}`}
        >
          <Link className="nav-link" to="#" onClick={() => setActiveNavbar("menu")}>
            <i class="fa fa-cutlery" aria-hidden="true"></i>
          </Link>
          <span className="tooltiptext">Menu</span>
        </li>

{/* Waiter */}
        <li
          className={`nav-item tool-tip ${activeNavbar === "waiter" ? "active" : ""}`}
        >
          <Link className="nav-link" to="#" onClick={() => setActiveNavbar("waiter")}>
            <i class="fa fa-users" aria-hidden="true"></i>
          </Link>
          <span className="tooltiptext">Waiter</span>
        </li>

{/* Settings */}
        <li
          className={`nav-item tool-tip ${
            activeNavbar === "settings" ? "active" : ""
          }`}
        >
          <Link className="nav-link" to="#">
            <i
              class="fa fa-cog"
              aria-hidden="true"
              onClick={() => setActiveNavbar("settings")}
            ></i>
          </Link>
          <span className="tooltiptext">Settings</span>
        </li>

{/* Logout */}
        <li
          className={`nav-item tool-tip ${activeNavbar === "logout" ? "active" : ""}`}
        >
          <Link className="nav-link" to="#">
            <i
              class="fa fa-sign-out"
              aria-hidden="true"
              onClick={() => handleLogout()}
            ></i>
          </Link>
          <span className="tooltiptext">Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default SideNavBar;
