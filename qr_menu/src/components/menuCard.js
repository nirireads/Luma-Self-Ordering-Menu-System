import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/mainContext";

function MenuCard() {
  const { filteredMenu, setFilteredMenu } = useContext(MainContext);
  const API_ENDPOINT = "http://192.168.1.85:8000/";

  useEffect(() => {
    fetch(API_ENDPOINT +"api/dish/")
      .then((response) => response.json())
      .then((data) => setFilteredMenu(data))
      .catch((error) => console.log(error));
    
  }, []);

  return (
    <>
      {filteredMenu &&
        filteredMenu.map((item) => {
          return (
            <div
              className="card m-4"
              style={{
                borderRadius: "25px",
                width: "max",
                marginBottom: "6rem"
              }}
              key={item.id}
            >
              {/* Row 1 - Image */}
              <div className="row">
                <div className="col my-3 mx-3">
                  <img
                    src={API_ENDPOINT + item.cover}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      maxWidth: "max",
                      maxHeight: "300px",
                      // minWidth: "200px",
                      minHeight: "300px",
                      objectFit: "cover",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      borderRadius: "15px",
                    }}
                  />
                </div>
              </div>

              {/* Row 2 title */}
              <div className="row">
                <div
                  className="card-title col my-1 mx-4"
                  style={{
                    textAlign: "left",
                    fontFamily: "Garamond, serif",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </div>
              </div>

              {/* Price */}
              <div className="row">
                <div
                  className="col mb-4 mx-4"
                  style={{
                    fontFamily: "Garamond, serif",
                    color: "darkgreen",
                    textAlign: "left",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                  }}
                >
                  <div>
                    <span>Rs. {item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
export default MenuCard;
