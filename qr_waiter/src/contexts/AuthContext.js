// import { createContext, useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
// import { useHistory } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const API_ENDPOINT = "http://192.168.1.92:8000/";
//   const API_ENDPOINT = "http://192.168.255.175:8000/";

//   let authState = localStorage.getItem("authTokens")
//     ? JSON.parse(localStorage.getItem("authTokens"))
//     : null;
//   let userState = localStorage.getItem("authTokens")
//     ? jwt_decode(localStorage.getItem("authTokens"))
//     : null;

//   let [user, setUser] = useState(() => userState);
//   let [authTokens, setAuthTokens] = useState(() => authState);
//   let [loading ] = useState(true);


//   const history = useHistory();

//   let loginUser = async (e) => {
//     e.preventDefault();

//     let response = await fetch(API_ENDPOINT + "api/token/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: e.target.username.value,
//         password: e.target.password.value,
//       }),
//     });

//     let data = await response.json();

//     if (response.status === 200) {
//       setAuthTokens(data);
//       setUser(jwt_decode(data.access));
//       localStorage.setItem("authTokens", JSON.stringify(data));
//       history.push("/");
//     } else {
//       alert("Unauthorized.");
//     }
//   };


//   let updateToken = async (e) => {
//     let response = await fetch(API_ENDPOINT + "api/token/refresh/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         refresh: authTokens.refresh,
//       }),
//     });

//     let data = await response.json();

//     if (response.status === 200) {
//       setAuthTokens(data);
//       setUser(jwt_decode(data.access));

//       localStorage.setItem("authTokens", JSON.stringify(data));
//       history.push("/");
//     } else {
//       logoutUser();
//     }
//   };


//   let logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);

//     localStorage.removeItem("authTokens");

//     history.push("/login");
//   };



//   let contextData = {
//     user: user,
//     authTokens: authTokens,

//     loginUser: loginUser,
//     logoutUser: logoutUser,
//     API_ENDPOINT,
//   };

//   useEffect(() => {
//     let fourMin = 1000 * 60 * 4;
//     let interval = setInterval(() => {
//       if (authTokens) {
//         updateToken();
//       }
//     }, fourMin);
//     return () => clearInterval(interval);
//   }, [authTokens, loading]);

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const API_ENDPOINT = "http://192.168.1.92:8000/";
  const API_ENDPOINT = "http://192.168.151.175:8000/";

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
          alert.log("Authentication failed:", data.error);
        }
      })
      .catch((error) => {
        alert.error("Error:", error);
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
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

