import React, { useContext, useState } from "react";
import "./styles/r_MenuPage.css";
import { AuthContext } from './../../context/AuthContext';
import { WorkBarContext } from "../../context/WorkBarContext";

function R_MenuPage() {
  const { API_ENDPOINT } = useContext(AuthContext);
  const { setDishes } = useContext(WorkBarContext)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("menu_category", menuCategory);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("cover", cover);

    fetch(API_ENDPOINT + "api/dish/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName("");
        setPrice("");
        setMenuCategory("");
        setStatus("");
        setDescription("");
        setCover("");
        fetch(API_ENDPOINT + "api/dish/")
          .then((response) => response.json())
          .then((data) => setDishes(data))
          .catch((error) => console.log(error));
      })
      .catch ((error) => console.log(error));
};

return (
  <>
    <div className="menuContainer">
      <div className="title"> Add Menu</div>
      <form >
        <div className="row px-3">
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            className="col-8 mr-4"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            className="col"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="row px-3">
          <select className="col-4 mr-4" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled  hidden>
              Status
            </option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <select
            value={menuCategory}
            className="col"
            onChange={(e) => setMenuCategory(e.target.value)}
          >
            <option value="" disabled  hidden>
              Menu Category
            </option>
            <option value="appetizers">Appetizers</option>
            <option value="main_course">Main Course</option>
            <option value="beverages">Beverages</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>

        <textarea
          style={{ width: "100%" }}
          value={description}
          placeholder="Description About Food . . ."
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Select Image"
          style={{ width: "100%", padding: "1rem 1rem" }}
          type="file"
          onChange={(evt) => setCover(evt.target.files[0])}
        />
        <div className="form-button">
          <button type="submit" onClick={handleSubmit}>Add Menu</button>
        </div>
      </form>
    </div>

  </>
);

}

export default R_MenuPage;
