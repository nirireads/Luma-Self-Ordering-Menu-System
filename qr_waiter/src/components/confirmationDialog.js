import React from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  zIndex: 9999, // Ensures it's on top of everything
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const dialogStyle = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  maxWidth: '300px',
  textAlign: 'center',
};

const messageStyle = {
  marginBottom: '20px',
};

const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
};

const yesButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
};

const noButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
};

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={modalOverlayStyle}>
      <div style={dialogStyle}>
        <p style={messageStyle}>{message}</p>
        <div>
        <button style={{ ...buttonStyle, ...noButtonStyle }} onClick={onCancel}>
            No
          </button>
          <button style={{ ...buttonStyle, ...yesButtonStyle }} onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
