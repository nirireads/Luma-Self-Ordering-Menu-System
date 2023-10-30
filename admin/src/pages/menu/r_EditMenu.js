import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { WorkBarContext } from '../../context/WorkBarContext'
import { Redirect } from 'react-router-dom';

const R_EditMenu = () => {
    let { editItem, setEditItem, setDishes } = useContext(WorkBarContext);
    let { API_ENDPOINT } = useContext(AuthContext);

    const handleCancel = () => {
        console.log("cancel");
        setEditItem(null);
    }

    const handleEdit = (event) => {
        event.preventDefault();
        alert("Edit Saved", editItem.id);

        const formData = new FormData();
        formData.append("name", editItem.name);
        formData.append("price", editItem.price);
        formData.append("menu_category", editItem.menu_category);
        formData.append("status", editItem.status);
        formData.append("description", editItem.description);
        // formData.append("cover", editItem.cover);

        fetch(API_ENDPOINT + `api/dish/${editItem.id}`, {
            method: "PUT",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                fetch(API_ENDPOINT + "api/dish/")
                    .then((response) => response.json())
                    .then((data) => setDishes(data))
                    .then(setEditItem(null))
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="menuContainer">
                <div className="title"> Edit Menu</div>
                <form >
                    <div className="row px-3">
                        <input
                            type="text"
                            placeholder="Food Name"
                            value={editItem.name}
                            className="col-8 mr-4"
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editItem.price}
                            className="col"
                            onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                        />
                    </div>

                    <div className="row px-3">
                        <select className="col-4 mr-4" value={editItem.status} onChange={(e) =>
                            setEditItem({
                                ...editItem,
                                status: e.target.value,
                            })
                        }>
                            <option value="" disabled hidden>
                                Status
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                        <select
                            value={editItem.menu_category}
                            className="col"
                            onChange={(e) => setEditItem({ ...editItem, menu_category: e.target.value })}
                        >
                            <option value="" disabled hidden>
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
                        value={editItem.description}
                        placeholder="Description About Food . . ."
                        onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    />
                    <input
                        placeholder="Select Image"
                        style={{ width: "100%", padding: "1rem 1rem" }}
                        type="file"
                        disabled
                    // onChange={(evt) => setCover(evt.target.files[0])}
                    />
                    <div className="form-button">
                        <button type="submit" onClick={handleEdit} style={{ marginRight: "2rem" }}>Save</button>
                        <button type="submit" onClick={handleCancel} style={{ backgroundColor: "orangered" }}>Cancel</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default R_EditMenu;

