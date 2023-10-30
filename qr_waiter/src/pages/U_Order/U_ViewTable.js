import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContext';
// import TableComponent from '../../components/tableComponent';
import EmptyTableComponent from '../../components/emptyTableComponent';
import "./styles/U_ViewTable.css";

function U_ViewTable() {
    const { setOrderTable, tables, getOrderTime } = useContext(MainContext);

    const handleSelectedTable = (tableno) => {
        setOrderTable(tableno);
    }

    return (
        <div className='viewTable-container'>
            <div className='viewTable-title'> <span>LUMA</span> view orders</div>
            <div className='table-container'>
                {tables.map((item) => (
                    item.state === "Empty" ? (
                        // <Link to="/viewOrder" key={item.id} onClick={() => handleSelectedTable(item.table_no)}>
                        //     <TableComponent
                        //         tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
                        //         tableState={item.state}
                        //     />
                        // </Link>
                        ""
                    ) : (
                        <Link to="/u_viewOrder" key={item.id} onClick={() => handleSelectedTable(item.table_no)}>
                            <EmptyTableComponent
                                tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
                                tableState={item.state}
                                orderTime={getOrderTime(item.table_no)}
                            />
                        </Link>
                    )
                ))}
            </div>

        </div>






    );
}

export default U_ViewTable;