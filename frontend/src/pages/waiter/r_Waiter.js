import React, { useContext, useState } from "react";
import "./styles/r_Waiter.css";
import { AuthContext } from './../../context/AuthContext';
import { WorkBarContext } from "../../context/WorkBarContext";

function R_Waiter() {
  const { API_ENDPOINT } = useContext(AuthContext);
  const { setWaiters } = useContext(WorkBarContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [contactNo, setContactNo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const waiterData = {
      username: username,
      password: password,
      is_active: isActive,
      contact_no: contactNo,
    };

    fetch(API_ENDPOINT + "api/waiter/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waiterData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsername("");
        setPassword("");
        setIsActive(false);
        setContactNo("");
        fetch(API_ENDPOINT + "api/waiter/")
          .then((response) => response.json())
          .then((data) => setWaiters(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="waiterContainer">
      <div className="title">Add Waiter</div>
      <form>
        <div className="row px-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="col-6 mr-4"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="col"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row px-3">
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNo}
            className="col-6 mr-4"
            onChange={(e) => setContactNo(e.target.value)}
          />
          <label className="col checkbox-label">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <span className="checkmark"></span>
            Active
          </label>
        </div>
        <div className="form-button">
          <button type="submit" onClick={handleSubmit}>Add Waiter</button>
        </div>
      </form>
    </div>

  );
}

export default R_Waiter;
