import React, { useContext, useState, useEffect } from 'react';
import "./OrderPage.css";
import dine from './dine.png';

import { MainContext } from '../../contexts/MainContext';
import { Redirect } from 'react-router-dom';

function OrderPage() {
    const { selectedTable, menuItems, setMenuItems, API_ENDPOINT } = useContext(MainContext);

    const handleOrderAdd = (menuItem) => {
        const orderData = {
            table: selectedTable,
            menuItem: menuItem.id,
            quantity: menuItem.counter,
        };

        console.log("order added", orderData);

        fetch(API_ENDPOINT + 'api/addorder/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Order added successfully');
                    //       // Perform any necessary actions after successful order creation
                } else {
                    throw new Error('Failed to add order');
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle the error scenario
            });
    };

    const handleCounterChange = (menuItem, value) => {
        // Update the counter of the menu item
        if (value > -1) {
            const updatedMenuItems = menuItems.map((item) =>
                item.id === menuItem.id ? { ...item, counter: value } : item
            );
            setMenuItems(updatedMenuItems);
        }

    };

    return (
        <div>
            {/* TOP CONTAINER */}
            <div className='order-top-container'>
                <div className='order-table'>
                    <div className='order-table-icon'>
                        <img src={dine} alt="dining-icon" />
                    </div>
                    <div className='order-table-content'>
                        <div className='table-no'>Table No</div>
                        <div className='selected-table-no'>{selectedTable < 10 ? `0${selectedTable}` : selectedTable}</div>
                    </div>
                </div>
            </div>

            {(() => {
                if (selectedTable == null) {
                    return <Redirect to="/" />;
                } else {
                    return (

                        <div className="menu-card">
                            <div className="menu-items">
                                {menuItems.map((item) => (
                                    <div key={item.id} className="menu-item">
                                        <img src={`${API_ENDPOINT}${item.cover}`} className='menu-card-image' />
                                        <div className="item-info">
                                            <span className="menu-card-name">{item.name}</span>

                                            <span className="menu-card-price">{item.price}</span>
                                            <div className="menu-card-counter">
                                                <button className='menu-card-counter-button'
                                                    onClick={() => handleCounterChange(item, item.counter - 1)}
                                                >
                                                    <span>-</span>
                                                </button>
                                                <span className='menu-card-counter-value'>{item.counter}</span>
                                                <button className='menu-card-counter-button'
                                                    onClick={() => handleCounterChange(item, item.counter + 1)}
                                                >
                                                    <span>+</span>
                                                </button>
                                            </div>
                                        </div>
                                        <button className='menu-card-add-button' onClick={() => handleOrderAdd(item)}>Add</button>
                                    </div>
                                ))}
                            </div>
                        </div>



                    )
                }
            })()}



        </div>




    );
}

export default OrderPage;