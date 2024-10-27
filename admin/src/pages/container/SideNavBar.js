import React, { useContext } from "react";
import { Link } from "react-router-dom";
import luma from "../../images/luma.jpg";
import { AuthContext } from "../../context/AuthContext";
import { MainContext } from "../../context/MainContext";

function SideNavBar() {
  const { activeNavbar, setActiveNavbar } = useContext(MainContext);
  const { logoutUser } = useContext(AuthContext);

  const navItems = [
    {
      id: "logo",
      icon: <img src={luma} alt="Restaurant Logo" />,
      tooltip: "",
      link: "/",
    },
    {
      id: "home",
      icon: <i className="fa fa-home fa-fw" aria-hidden="true"></i>,
      tooltip: "Home",
    },
    {
      id: "menu",
      icon: <i className="fa fa-cutlery" aria-hidden="true"></i>,
      tooltip: "Menu",
    },
    {
      id: "waiter",
      icon: <i className="fa fa-users" aria-hidden="true"></i>,
      tooltip: "Waiter",
    },
    {
      id: "settings",
      icon: <i className="fa fa-cog" aria-hidden="true"></i>,
      tooltip: "Settings",
    },
    {
      id: "logout",
      icon: <i className="fa fa-sign-out" aria-hidden="true"></i>,
      tooltip: "Logout",
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Do you want to Logout?")) {
      logoutUser();
    } else {
      console.log("Logout Cancelled");
    }
  };

  return (
    <div className="sidebar">
      <ul className="nav">
        {navItems.map(({ id, icon, tooltip, link }) => (
          <li
            key={id}
            className={`nav-item tool-tip ${
              activeNavbar === id ? "active" : ""
            }`}
          >
            <Link
              className="nav-link"
              to={link || "#"}
              onClick={() =>
                id === "logout" ? handleLogout() : setActiveNavbar(id)
              }
            >
              {icon}
            </Link>
            {tooltip && <span className="tooltiptext">{tooltip}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavBar;
