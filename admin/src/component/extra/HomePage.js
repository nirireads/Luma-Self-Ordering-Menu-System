import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  let [notes, setNotes] = useState([]);
  let {authTokens} = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ String(authTokens.access),
        },
      });

      let data = await response.json();
      if (response.status === 200) {
        setNotes(data);
      } else if (response.statusText === "Unauthorized") {
        console.log("here error");
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> This is From Home Page.</h1>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
