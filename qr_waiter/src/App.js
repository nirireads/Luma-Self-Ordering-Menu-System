import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import OrderPage from "./pages/Order/OrderPage";

import ViewTable from "./pages/ViewOrder/ViewTable";
import ViewOrder from "./pages/ViewOrder/ViewOrder";
import U_ViewOrder from "./pages/U_Order/U_ViewOrder";
import U_ViewTable from "./pages/U_Order/U_ViewTable";

import User from "./pages/User/UserPage";

import PrivateRoute from './contexts/PrivateRoute';
import AuthProvider from "./contexts/AuthContext";
import ContextApp from "./contexts/MainContext";
import BottomNavbar from "./components/bottomNavbar";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute>
            <ContextApp>
              <Route path="/user" component={User} />
              <Route path="/u_viewOrder" component={U_ViewOrder} />
              <Route path="/u_viewTable" component={U_ViewTable} />
              <Route path="/viewOrder" component={ViewOrder} />
              <Route path="/viewTable" component={ViewTable} />
              <Route path="/order" component={OrderPage} />
              <Route path="/" component={HomePage} exact />
            </ContextApp>
            <BottomNavbar />
          </PrivateRoute>
        </Switch>
      </AuthProvider>

    </div>


  );
};

export default App;
