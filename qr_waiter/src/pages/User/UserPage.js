import React, { useContext } from "react";
import "./UserPage.css";
import waiter from './waiter_img.png';

import { AuthContext } from '../../contexts/AuthContext';

function User() {
    const { logoutUser , user } = useContext(AuthContext);


    return (
        <div className='home-container user-container'>
            <div className='home-title'> <span>LUMA</span> profile</div>
            <div className='table-container'>
                <div className="user-profile">
                    <img className="profile-img" src={waiter} alt="profile of user" style={{ height: "8rem", width: "8rem" }} />
                    <div className="profile-username">@{user.username}</div>
                    <div className="profile-contact">Contact :{user.contact_no}</div>
                </div>
                <button className="profile-logout" onClick={logoutUser}>Logout</button>
            </div>
        </div>
    );
}

export default User;
