import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const API_ENDPOINT = "http://192.168.1.92:8000/"
  const API_ENDPOINT = "http://127.0.0.1:8000/"
  // const API_ENDPOINT = "http://192.168.255.175:8000/"

  let authState = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  let userState = localStorage.getItem("authTokens")
    ? jwt_decode(localStorage.getItem("authTokens"))
    : null;

  let [user, setUser] = useState(() => userState);
  let [authTokens, setAuthTokens] = useState(() => authState);
  let [loading, setLoading] = useState(true);

  const history = useHistory();

  //   LOGIN FUNCTION
  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(API_ENDPOINT + "api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("Invalid Credentials. Please Check Username and Password.");
    }
  };

  //   UPDATE TOKEN
  let updateToken = async (e) => {
    // e.preventDefault();
    console.log("update token called");

    let response = await fetch(API_ENDPOINT + "api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));

      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      logoutUser();
    }
  };

  //  lOGOUT FUNCTION
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);

    localStorage.removeItem("authTokens");

    history.push("/login");
  };

  let contextData = {
    API_ENDPOINT,

    user: user,
    authTokens: authTokens,

    loginUser: loginUser,
    logoutUser: logoutUser, setLoading
  };

  useEffect(() => {
    let fourMin = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMin);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
