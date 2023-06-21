import React from 'react';
import "../styles/OrderSummary.css"


const TotalSales = ({ totalRevenue, month }) => {
    console.log(totalRevenue);
    return (
        <div className='orderSummary-container'>
            <div className='title'>Total Revenue</div>
            <div className='orderSummary-component'>
                <button className='orderSummary-button'>
                    <div className='orderSummary-top'>
                        <div className='orderSummary-number'>{month}</div>
                    </div>
                    <div className='orderSummary-middle'>{totalRevenue < 1 ? 0 : `${totalRevenue}`}</div>
                </button>
            </div>
        </div>
    );
};

export default TotalSales;
