import React, { useContext } from "react";
import QrCode from "./QR_code";
import { WorkBarContext } from "../../context/WorkBarContext";
import { AuthContext } from "../../context/AuthContext";
import "./styles/r_Restaurant.css";

function R_Restaurant() {
  let { selectedTable } = useContext(WorkBarContext);
  let { API_ENDPOINT } = useContext(AuthContext);

  const url = `http://${
    API_ENDPOINT.split("://")[1].split(":")[0]
  }:3001?tableNumber=${selectedTable}`;

  return (
    <div className="QR_container">
      <h2 className="title">Download QR</h2>
      <p>For Table No. {selectedTable}</p>
      <div className="qr-box">
        <QrCode tableUrl={url} selectedTable={selectedTable} />
      </div>
    </div>
  );
}

export default R_Restaurant;
