import React from 'react';
import "./styles/tableComponent.css";

function EmptyTableComponent({ tableNumber, tableState, orderTime}) {
  return (
    <div className='empty-table-component'>
      <button className='table-button'>
        <div className='table-top'>
          <div className='people-icon'><i className="fa fa-users" aria-hidden="true"></i></div>
          <div className='table-number'>{tableNumber}</div>
        </div>
        <div className='table-middle'>{tableState}</div>
        <div className='table-bottom'>
          <div className='order-time'>{orderTime}</div>
        </div>
      </button>
    </div>
  );
}

export default EmptyTableComponent;
