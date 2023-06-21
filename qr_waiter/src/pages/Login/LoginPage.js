import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authenticateUser, user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(username, password);
  };


  if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <div className="screen">
          <div className="logo-container">
            <div className="logo"><img src="./luma.jpg" /></div>
          </div>
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fa fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Username"
                // name="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fa fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                // name="password"
                valule={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="button login__submit"
              type="submit"
            >
              <span className="button__text">Log In Now</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }

}
export default LoginPage;
