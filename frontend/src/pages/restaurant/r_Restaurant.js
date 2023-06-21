import React, { useContext } from "react";
import QrCode from "./QR_code";
import { WorkBarContext } from "../../context/WorkBarContext";
import { AuthContext } from "../../context/AuthContext";
import "./styles/r_Restaurant.css";

function R_Restaurant() {
  let { selectedTable } = useContext(WorkBarContext);
  // let { API_ENDPOINT } = useContext(AuthContext);
  let API_ENDPOINT  = "http://192.168.151.175:8000";

  const url = `http://${API_ENDPOINT.split('://')[1].split(':')[0]}:3001?tableNumber=${selectedTable}`;

  return (
    <div className="QR_container">
      <h2 className="title">Download QR Code: {selectedTable}</h2>
      <QrCode tableUrl={url} selectedTable={selectedTable}/>
    </div>
  );
};

export default R_Restaurant;
