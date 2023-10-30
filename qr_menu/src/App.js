import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import BottomNavbar from "./components/bottomNavbar";
import Order from './pages/orderPage/order';
import Menu from "./pages/menuPage/menu";
import Invoice from "./pages/invoicePage/invoice";
import ErrorPage from './pages/errorPage';

import ContextApp from "./contexts/mainContext";

function App() {
  return (
    <div className="App">
      <Switch>
        <ContextApp>
          <Route path="/invoice" component={Invoice} />
          <Route path="/order" component={Order} />
          <Route path="/" component={Menu} exact />

          <Route path="/error" component={ErrorPage} />
          <BottomNavbar />
        </ContextApp>
      </Switch>
    </div>
  );
}

export default App;
