import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./styles/Restaurant.css";

const QrCode = ({ tableUrl, selectedTable }) => {
  const [url, setUrl] = useState();

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `tableno_${selectedTable}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={tableUrl}
      size={300}
      bgColor={"white"}
      level={"H"}
    />
  );

  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Enter URL</label>
          <p>
            <input
              type="text"
              value={tableUrl}
              onChange={qrCodeEncoder}
              placeholder="http://192.168.1.92:3000?tableNumber=1"
              disabled
            />
          </p>
          <p>
            <button type="submit" disabled={!selectedTable}>
              Download QR Code
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
