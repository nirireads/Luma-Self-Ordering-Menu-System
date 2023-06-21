import React, { useState } from "react";
import "./styles/orderCard.css";



function OrderCard(props) {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);


  const incrementCount = () => {
    setCount(count + 1);
    setPrice((count+1)*50);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice((count-1)*50);

    }
  };

  const addToCart = () => {
    // TODO: Implement adding item to cart
    console.log(`Added ${count} ${props.name}(s) to cart`);
  };

  const handleButton = () => {
    if (count ===1){
      console.log("delete button clicked");
    }else{
      console.log("add Order");
    }
  };

  return (
    <div class="card mx-3 my-2">
      <div class="row">
        <div class="col-4">
          <img
            src="./images/item-1.jpeg"
            class="img-fluid rounded-start"
            alt="food-img"
          />
        </div>

        <div className="col-6 card-text">
          {/* row1 */}
          <div className="row card-title"> Banana Pancakes</div>

          {/* row2 */}
          <div className="row card-counter">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn counter-button mr-3"
                  onClick={decrementCount}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  type="button"
                  className="btn counter-button ml-3"
                  onClick={incrementCount}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* row3 */}
          <div className="row card-price">
            <span>Rs. {price}</span>
          </div>


        </div>

        <div className="col card-delete" onClick={() => handleButton()}>
        {count === 1 ? <i className="fa fa-trash-o"></i>:<i className="fa fa-cutlery"></i>}          
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
