import "./App.css";
import { Route, Switch } from "react-router-dom";

// import BottomNavbar from "./components/bottomNavbar";
import Menu from './components/menu';
// import Order from "./components/order";
// import User from "./components/user";

import ContextApp from "./contexts/mainContext";
// import OrderContextApp from "./contexts/orderContext";

function App() {
  return (
    <div className="App">
      <ContextApp>
        <Switch>
          {/* <Route path="/order" component={Order} /> */}
          {/* <Route path="/user" component={User} /> */}
          <Route path="/" exact component={Menu} />
        </Switch>
      </ContextApp>
      {/* <BottomNavbar /> */}
    </div>
  );
}

export default App;
