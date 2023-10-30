import React, { useContext } from 'react';
import "./styles/U_ViewOrder.css";
import dine from './dine.png';
import { MainContext } from '../../contexts/MainContext';
import { Redirect } from 'react-router-dom';

function U_ViewOrder() {
    const { orderTable, orders, menuItems, API_ENDPOINT, tables } = useContext(MainContext);

    let updatedTable = tables.find((table) => table.table_no === orderTable);
    const filteredOrders = orders.filter((order) => order.table === updatedTable.id);

    let totalPrice = 0;


    const orderItems = filteredOrders.map((order) => {
        // Find the corresponding menu item using its ID
        const menuItem = menuItems.find((item) => item.id === order.menu_item);

        const subtotal = menuItem.price * order.counter;
        totalPrice += subtotal;

        return (
            <div key={order.id} className='order-item'>
                <div className='order-img'>
                    <img src={API_ENDPOINT + menuItem.cover} alt="Menu Item Cover" />
                </div>
                <div className='order-content'>
                    <div className='order-name'>{menuItem.name}</div>
                    <div className='order-qty'>{order.counter}</div>
                </div>
                <div className='order-price'>Rs.{menuItem.price * order.counter}</div>

            </div>
        );
    });



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

            {(() => {
                if (orderTable == null) {
                    return <Redirect to="/" />;
                } else {
                    return (
                        <div className="order-card">
                            <div className='order-title'>Orders</div>

                            <div className="order-items">
                                {orderItems}
                            </div>
                        </div>
                    )
                }
            })()}



        </div>

    );
}



export default U_ViewOrder;