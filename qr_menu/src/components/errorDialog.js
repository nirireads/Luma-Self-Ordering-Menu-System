import React from "react";

function ErrorDialog({ message, onClose }) {
  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    padding: "0 5%",
    background: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999",
  };

  const dialogStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  };

  const contentStyle = {
    textAlign: "center",
  };

  const buttonStyle = {
    background: "darkred",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const buttonHoverStyle = {
    background: "red",
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <div style={contentStyle}>
          <h2>Error</h2>
          <p>{message}</p>
          <button
            style={buttonStyle}
            onClick={onClose}
            onMouseOver={(e) => {
              e.target.style = { ...buttonStyle, ...buttonHoverStyle };
            }}
            onMouseOut={(e) => {
              e.target.style = { ...buttonStyle };
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorDialog;



// const [error, setError] = useState(null);

// const handleError = (message) => {
//   setError(message);
// };

// const closeErrorDialog = () => {
//   setError(null);
// };

// .catch((error) => {
//   handleError("An error occurred while fetching data from the server.");
//   console.error(error);
// });
// 
// Inside the compoentn we use
// {error && <ErrorDialog message={error} onClose={closeErrorDialog} />}