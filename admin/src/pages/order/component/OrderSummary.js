import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import "../styles/OrderSummary.css"


const OrderSummary = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const { API_ENDPOINT } = useContext(AuthContext);

    useEffect(() => {
        fetch(API_ENDPOINT + 'api/order-statistics/')
            .then(response => response.json())
            .then(data => {
                setTotalOrders(data.total_orders);
                setTotalRevenue(data.total_revenue);
            })
            .catch(error => {
                console.error(error);
            });
    }, [API_ENDPOINT]);

    return (
        <div className='orderSummary-container' style={{display:"flex", flexDirection:"column"}}>
            <div className='title'>Order Summary</div>
            <div className='orderSummary-component'>
                <button className='orderSummary-button'>
                    <div className='orderSummary-top'>
                        <div className='orderSummary-number'>Orders</div>
                    </div>
                    <div className='orderSummary-middle'>{totalOrders}</div>
                </button>
            </div>

            <div className='orderSummary-component'>
                <button className='orderSummary-button'>
                    <div className='orderSummary-top'>
                        <div className='orderSummary-number'>Revenue</div>
                    </div>
                    <div className='orderSummary-middle'>{totalRevenue}</div>
                </button>
            </div>

        </div>
    );
};

export default OrderSummary;
