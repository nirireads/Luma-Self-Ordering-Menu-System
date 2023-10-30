import React, { useContext } from 'react';
import "../styles/PopularItem.css";
import { AuthContext } from '../../../context/AuthContext';

const PopularItem = ({ filterType, month, months, popularItems, handleFilterTypeChange, handleMonthChange }) => {
    const { API_ENDPOINT } = useContext(AuthContext);
    return (
        <div class="popular-items-container">
            <h2>Popular Items</h2>
            <div class="filter-options">
                <div>
                    <label>Filter by:</label>
                    <select value={filterType} onChange={handleFilterTypeChange}>
                        <option value="frequency">By Frequency</option>
                        <option value="revenue">By Revenue</option>
                    </select>
                </div>
                <div>
                    <label>Month:</label>
                    <select value={month} onChange={handleMonthChange}>
                        {months.map((monthName, index) => {
                            const isDisabled = index > new Date().getMonth();
                            return (
                                <option key={index} value={monthName} disabled={isDisabled}>
                                    {monthName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <ul class="popular-item-list">
                {popularItems.map((item) => (
                    <li key={item.id}>
                        <img src={`${API_ENDPOINT}media/${item.menu_item__cover}`} alt={item.menu_item__name} />
                        <span>{item.menu_item__name}</span>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default PopularItem;
