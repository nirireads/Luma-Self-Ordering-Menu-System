import React from "react";
import graph from "./graph.png";
import "./user.css";

function User() {
  return (
    <div class="container">
      <div class="screen">
        <div className="logo-container">
          <div className="logo">
            luma
          </div>
        </div>
        <form class="login">
          <div class="login__field">
            <i class="login__icon fa fa-user"></i>
            <input
              type="text"
              class="login__input"
              placeholder="Username"
            />
          </div>
          <div class="login__field">
            <i class="login__icon fa fa-lock"></i>
            <input
              type="password"
              class="login__input"
              placeholder="Password"
            />
          </div>
          <button class="button login__submit">
            <span class="button__text">Log In Now</span>
            <i class="button__icon fa fa-chevron-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default User;
