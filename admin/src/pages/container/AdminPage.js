import React from "react";

import SideNavBar from './SideNavBar';
import WorkBar from "./WorkBar";
import "./styles/AdminContainer.css";

import WorkBarContextApp from "../../context/WorkBarContext";

function AdminPage() {
  return (
    <div>
      <div class="admin-container">
        <div class="row">

          <div class="col left-container">
            <SideNavBar />
          </div>

          <WorkBarContextApp>
            <WorkBar />
          </WorkBarContextApp>

        </div>
      </div>
    </div>
  );
}

export default AdminPage;
