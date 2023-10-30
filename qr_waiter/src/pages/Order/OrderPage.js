import React, { useContext } from 'react';
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
                    // fetchUpdatedData();
                } else {
                    throw new Error('Failed to add order');
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle the error scenario
            });
    };

    // const fetchUpdatedData = async () => {
    //     try {
    //         // Fetch the updated menu items
    //         const response1 = await fetch(API_ENDPOINT + '/api/dish');
    //         const updatedMenuItems = await response1.json();
    //         setMenuItems(updatedMenuItems);
    
    //         // Fetch the updated orders
    //         const response2 = await fetch(API_ENDPOINT + 'api/getorder/');
    //         const updatedOrders = await response2.json();
    //         setOrders(updatedOrders);
    //     } catch (error) {
    //         console.error(error);
    //         // Handle the error scenario
    //     }
    // };

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
                                        <img src={`${API_ENDPOINT}${item.cover}`} alt={item.name} className='menu-card-image' />
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
                                        <button className='menu-card-add-button' onClick={() => handleOrderAdd(item)}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </button>
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