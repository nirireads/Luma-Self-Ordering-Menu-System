import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import "./LoginPage.css";
import luma from "../../images/lumaa.jpg";

function LoginPage() {
  let { loginUser, user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div class="login-content">
        <div class="flex-div">
          <div class="name-content">
            <div className="logo-content">
              <img src={luma} alt="luma-logo" style={{width:"130px"}}/>
              <p>
                <h1 class="logo">luma</h1>
                Asian Fusion Restaurant
              </p>
            </div>
          </div>

          <form onSubmit={loginUser}>
            <p>
              <input
                type="text"
                placeholder="Email or Phone Number"
                name="username"
                required
              />
            </p>
            <p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </p>
            <p>
              <button class="login">Log In</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
