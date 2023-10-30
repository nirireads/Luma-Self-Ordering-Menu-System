import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import AdminPage from "./pages/container/AdminPage";

import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import ContextApp from "./context/MainContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute>
            <ContextApp>
              <Route path="/" component={AdminPage} exact />
            </ContextApp>
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
