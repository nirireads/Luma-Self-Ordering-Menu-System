import React, { useContext, useState, useEffect } from 'react';
import "./styles/ViewOrder.css";
import dine from './dine.png';
import { MainContext } from '../../contexts/MainContext';
import { Redirect } from 'react-router-dom';
import ErrorDialog from '../errorPage';
import ConfirmationDialog from '../../components/confirmationDialog';

function ViewOrder() {
    const { orderTable, API_ENDPOINT, tables } = useContext(MainContext);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [error, setError] = useState(null);

    // For Error Handling
    const handleError = (message) => {
        setError(message);
    };

    const closeErrorDialog = () => {
        setError(null);
    };

    // For Recently Selected table
    const updatedTable = tables.find((table) => table.table_no === orderTable);


    // State to manage the confirmation dialog
    const [confirmationData, setConfirmationData] = useState({
        show: false,
        action: null,
    });

    // Function to show the confirmation dialog
    const showConfirmation = (action) => {
        setConfirmationData({ show: true, action });
    };

    // Function to handle confirmation dialog close
    const handleConfirmationClose = () => {
        setConfirmationData({ show: false, action: null });
    };

    // Function to perform order actions (delete or confirm)
    const handleOrderAction = async (e) => {
        e.preventDefault();

        if (confirmationData.action === 'delete') {
            // Implement order deletion logic here
            console.log('Deleting order...');
            const ordersIdsToDelete = customerOrders.map((order) => (order.id));

            console.log("delete id", ordersIdsToDelete);
            const deleteResponse = await fetch(API_ENDPOINT + 'api/customer_orders/delete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order_ids: ordersIdsToDelete }), // Send an object with an "order_ids" property
            });

            if (!deleteResponse.ok) {
                throw new Error('Failed to delete orders from customerOrderModel.');
            }

            console.log('Orders deleted from customerOrderModel successfully!');

        } else if (confirmationData.action === 'confirm') {
            // Implement order confirmation logic here
            console.log('Confirming orders...');
            try {
                const formattedOrders = customerOrders.map((order) => ({
                    table: order.table,
                    menuItem: order.menu_item,
                    quantity: order.counter,
                }));

                console.log("entry database", formattedOrders);
                // Send a POST request to the backend API with the orders array in the body
                const response = await fetch(API_ENDPOINT + 'api/addorder/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedOrders), // Send the array of orders in the body
                });

                if (!response.ok) {
                    throw new Error('Failed to add orders.');
                }
                console.log('Orders added successfully!');

                const ordersIdsToDelete = customerOrders.map((order) => (order.id));

                console.log("delete id", ordersIdsToDelete);
                const deleteResponse = await fetch(API_ENDPOINT + 'api/customer_orders/delete/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ order_ids: ordersIdsToDelete }), // Send an object with an "order_ids" property
                });

                if (!deleteResponse.ok) {
                    throw new Error('Failed to delete orders from customerOrderModel.');
                }

                console.log('Orders deleted from customerOrderModel successfully!');
            } catch (error) {
                console.error('Error adding orders:', error);
                console.log('Failed to add orders. Please try again later.');
            }

        }
        handleConfirmationClose(); // Close the dialog after the action
    };

    // Function to handle order deletion
    const handleDeleteOrder = () => {
        showConfirmation('delete');
    };

    // Function to handle order confirmation
    const handleConfirmOrder = () => {
        showConfirmation('confirm');
    };

    useEffect(() => {
        if (!updatedTable) {
            return;
        }

        fetch(API_ENDPOINT + `api/customer_orders_table/?table=${updatedTable.table_no}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(async (data) => {
                const updatedOrders = await Promise.all(data.map(async (order) => {
                    try {
                        const dishResponse = await fetch(API_ENDPOINT + `api/dish/${order.menu_item}`);
                        if (!dishResponse.ok) {
                            throw new Error("Error fetching dish information");
                        }
                        const dishData = await dishResponse.json();
                        return { ...order, dish: dishData };
                    } catch (error) {
                        console.error("Error fetching dish information:", error);
                        handleError("An error occurred while fetching data from the server.");
                        return { ...order, dish: null };
                    }
                }));

                setCustomerOrders(updatedOrders);
                console.log("customerOrders", customerOrders);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                handleError("An error occurred while fetching data from the server.");
            });
    }, [setCustomerOrders, updatedTable, API_ENDPOINT]);

    // Render order items
    const orderItems = customerOrders.map((order) => (
        <div key={order.id} className='order-item'>
            <div className='order-img'>
                <img src={API_ENDPOINT + order.dish.cover} alt="Menu Item Cover" />
            </div>
            <div className='order-content'>
                <div className='order-name'>{order.dish.name}</div>
                <div className='order-qty'>{order.counter}</div>
            </div>
            <div className='order-price'>Rs.{order.dish.price * order.counter}</div>
        </div>
    ));

    return (
        <div>
            <div className='order-top-container' style={{ position: "sticky", top: "0", background: "white" }}>
                <div className='order-table'>
                    <div className='order-table-icon'>
                        <img src={dine} alt="dining-icon" />
                    </div>
                    <div className='order-table-content'>
                        <div className='table-no'>Table No</div>
                        <div className='selected-table-no'>{orderTable < 10 ? `0${orderTable}` : orderTable}</div>
                    </div>
                </div>
            </div>

            {orderTable == null ? (
                <Redirect to="/" />
            ) : (
                <div className="order-card">
                    <div className='order-title'>Orders</div>

                    <div className="order-items">
                        {orderItems}
                    </div>

                    <div className='order-action-buttons'
                        style={{ display: "flex", justifyContent: "space-evenly", margin: "20px auto auto auto" }}>
                        <button
                            onClick={handleDeleteOrder}
                            className="delete-button"
                            style={{ backgroundColor: "red", padding: "10px 10px", borderRadius: "10px", color: "white", border: "none" }}>
                            Delete Order</button>
                        <button
                            onClick={handleConfirmOrder}
                            className="confirm-button"
                            style={{ backgroundColor: "green", padding: "10px 10px", borderRadius: "10px", color: "white", border: "none" }}>
                            Confirm Order</button>
                    </div>
                </div>
            )}

            {error && <ErrorDialog message={error} onClose={closeErrorDialog} />}
            {confirmationData.show && (
                <ConfirmationDialog
                    message={
                        confirmationData.action === 'delete'
                            ? 'Are you sure you want to delete this order?'
                            : 'Are you sure you want to confirm this order?'
                    }
                    onConfirm={handleOrderAction}
                    onCancel={handleConfirmationClose} />
            )}
        </div>
    );
}

export default ViewOrder;
