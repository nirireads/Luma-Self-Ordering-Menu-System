import React, { useContext } from 'react';
import { WorkBarContext } from '../../../context/WorkBarContext';
import '../styles/ShowOrder.css';

const ShowOrder = ({ selectedTable }) => {
    const { orders, menuItems, tables, API_ENDPOINT} = useContext(WorkBarContext);

    let tableOrders;
    const table = tables.find((table) => table.table_no === selectedTable);
    if (table) {
        tableOrders = orders.filter((order) => order.table === table.id);
    }

    if (!table || !tableOrders || !menuItems) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-container">
            {tableOrders.length > 0 ? (
                tableOrders.map((order, index) => {
                    const menuItem = menuItems.find((item) => item.id === order.menu_item);
                    if (menuItem) {
                        return (
                            <div className="order-card" key={index}>
                                <div className="order-img">
                                    <img src={API_ENDPOINT + menuItem.cover} alt={menuItem.name} />
                                </div>
                                <div className="order-details">
                                    <h4 className="order-name">{menuItem.name}</h4>
                                    <p className="order-quantity">Qty: {order.counter}</p>
                                </div>
                            </div>
                        );
                    }

                })
            ) : (
                <div className="no-order-msg">No orders for this table</div>
            )}
        </div>
    );
};

export default ShowOrder;
