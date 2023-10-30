import React, { useContext } from "react";
import "./styles/Waiter.css";
import { AuthContext } from './../../context/AuthContext';
import { WorkBarContext } from "../../context/WorkBarContext";

function Waiter() {
  const { API_ENDPOINT } = useContext(AuthContext);
  const { waiters, setWaiters, setEditWaiter, editWaiter } = useContext(WorkBarContext);

  const handleEdit = (waiterId) => {
    const selectedItem = waiters.find((waiter) => waiter.id === waiterId);
    setEditWaiter(selectedItem);
    console.log(editWaiter);
  };

  const handleDelete = async (waiterId) => {
    let text = "Do you want to delete the waiter?";
    if (window.confirm(text)) {
      try {
        // Delete waiter
        const response = await fetch(`${API_ENDPOINT}api/waiter/${waiterId}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          // Waiter deleted successfully
          setWaiters(waiters.filter((waiter) => waiter.id !== waiterId));
        } else {
          console.log("Failed to delete waiter");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Delete cancelled for waiter with ID:", waiterId);
    }
  };

  const handleActiveToggle = async (waiterId) => {
    let text = "Do you want to change the waiter's state?";
    if (window.confirm(text)) {
      try {
        const updatedWaiters = waiters.map((waiter) => {
          if (waiter.id === waiterId) {
            waiter.is_active = !waiter.is_active;
          }
          return waiter;
        });
        setWaiters(updatedWaiters);

        const updatedWaiter = updatedWaiters.find((waiter) => waiter.id === waiterId);

        const response = await fetch(`${API_ENDPOINT}api/waiter/${waiterId}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWaiter),
        });

        if (response.status !== 200) {
          console.log("Failed to update waiter's active status");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Toggle active status cancelled for waiter with ID:", waiterId);
    }
  };



  return (
    <div className="waiter-container">
      <div className="row title">Waiter Listing</div>

      <div className="row waiter-table">
        {waiters.map((waiter) => (
          <div key={waiter.id} className="waiter-item">
            <div className="waiter-content">
              <div className="waiter-name">@{waiter.username}</div>
              <div className="waiter-contact">{waiter.contact_no}</div>
            </div>
            <div className="waiter-action">
              <div className="waiter-checkbox">
                <input
                  type="checkbox"
                  checked={waiter.is_active ? true : false}
                  onChange={() => handleActiveToggle(waiter.id)}
                />
                <span>Active</span>
              </div>
              <div
                className="action-button"
                onClick={() => handleEdit(waiter.id)}
              >
                Edit
              </div>
              <div
                className="action-button"
                onClick={() => handleDelete(waiter.id)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Waiter;
