import React from "react";

import SideNavBar from "./SideNavBar";
import "./styles/AdminContainer.css";

import WorkBarContextApp from "../../context/WorkBarContext";
import MiddleContainer from "./MiddleContainer";
import RightContainer from "./RightComponent";

function AdminPage() {
  return (
    <div class="admin-container">
      <div class=" left-container">
        <SideNavBar />
      </div>
      <WorkBarContextApp>
        <div class=" middle-container">
          <MiddleContainer />
        </div>
        <div class="right-container">
          <RightContainer />
        </div>{" "}
      </WorkBarContextApp>
    </div>
  );
}

export default AdminPage;
