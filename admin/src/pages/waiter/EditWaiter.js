import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { WorkBarContext } from '../../context/WorkBarContext'
import "./styles/r_Waiter.css";

const EditWaiter = () => {
    let { editWaiter, setEditWaiter, setWaiters } = useContext(WorkBarContext);
    let { API_ENDPOINT } = useContext(AuthContext);

    const handleCancel = () => {
        console.log("cancel");
        setEditWaiter(null);
    }

    const handleEdit = (event) => {
        event.preventDefault();
        alert("Edit Saved", editWaiter.id);

        const formData = new FormData();
        formData.append("username", editWaiter.username);
        formData.append("password", editWaiter.password);
        formData.append("contact_no", editWaiter.contact_no);
        formData.append("is_active", editWaiter.is_active);

        fetch(API_ENDPOINT + `api/waiter/${editWaiter.id}`, {
            method: "PUT",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                fetch(API_ENDPOINT + "api/waiter/")
                    .then((response) => response.json())
                    .then((data) => setWaiters(data))
                    .then(setEditWaiter(null))
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="waiterContainer">
                <div className="title">Edit Waiter</div>
                <form>
                    <div className="row px-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={editWaiter.username}
                            className="col-6 mr-4"
                            onChange={(e) => setEditWaiter({ ...editWaiter, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={editWaiter.password}
                            className="col"
                            onChange={(e) => setEditWaiter({ ...editWaiter, password: e.target.value })}
                        />
                    </div>
                    <div className="row px-3">
                        <input
                            type="text"
                            placeholder="Contact Number"
                            value={editWaiter.contact_no}
                            className="col-6 mr-4"
                            onChange={(e) => setEditWaiter({ ...editWaiter, contact_no: e.target.value })}
                        />
                        <label className="col checkbox-label">
                            <input
                                type="checkbox"
                                checked={editWaiter.is_active}
                                onChange={(e) => setEditWaiter({ ...editWaiter, is_active: !editWaiter.is_active })}
                            />
                            <span className="checkmark"></span>

                            Active
                        </label>
                    </div>
                    <div className="form-button">
                        <button type="submit" onClick={handleEdit} style={{ marginRight: "2rem" }}>Save</button>
                        <button type="submit" onClick={handleCancel} style={{ backgroundColor: "orangered" }}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditWaiter;

