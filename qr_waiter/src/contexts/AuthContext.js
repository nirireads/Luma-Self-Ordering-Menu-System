import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const API_ENDPOINT = "http://127.0.0.1:8000/";
  const API_ENDPOINT = "http://192.168.1.74:8000/";

  const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
  };

  const closeErrorDialog = () => {
    setError(null);
  };


  // Check if there is a user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const authenticateUser = (username, password) => {
    fetch(API_ENDPOINT + "api/authenticate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
        } else {
          console.log("Authentication failed:", data.error);
          handleError("Login Failed. Invalid username and password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        handleError("login failed");
      });
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  const authContextData = {
    API_ENDPOINT,
    user,
    authenticateUser,
    logoutUser,
    error, closeErrorDialog
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

