import React, { useState } from "react";
import "./styles/orderCard.css";

function FoodCard({ id, image, name }) {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="card mx-3 my-2 order-card" key={id}>
      <div className="row">
        <div className="col-4">
          <img
            src={image}
            className="img-fluid rounded-start"
            alt="food-img"
          />
        </div>

        <div className="col-7 card-text">
          {/* row1 */}
          <div className="row card-title"> {name} </div>

          {/* row2 */}
          <div className="row card-counter">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn counter-button mr-3 pb-5"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span>{counter}</span>
                <button
                  type="button"
                  className="btn counter-button ml-3 pb-5"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
