import React from "react";
import { Link } from "react-router-dom";

const errorContainerStyle = {
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#f8f8f8",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  margin: "2rem auto",
  maxWidth: "400px",
};

const headingStyle = {
  color: "#d9534f", // Red color for the heading
};

const linkStyle = {
  textDecoration: "none",
  color: "#337ab7", // Blue color for the link
};

function ErrorPage() {
  return (
    <div style={errorContainerStyle}>
      <h1 style={headingStyle}>Oops! Something went wrong.</h1>
      <p>We're sorry, but there was an error.</p>
      <Link to="/" style={linkStyle}>Go back to the home page</Link>
    </div>
  );
}

export default ErrorPage;
