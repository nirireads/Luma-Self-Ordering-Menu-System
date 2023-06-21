import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);

  return (
    <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>
  );
};

export default PrivateRoute;
