import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContext';
import TableComponent from '../../components/tableComponent';
import EmptyTableComponent from '../../components/emptyTableComponent';

import "./HomePage.css";

function HomePage() {
    const { setSelectedTable, tables, getOrderTime } = useContext(MainContext);

    const handleSelectedTable = (tableno) => {
        setSelectedTable(tableno);
    }

    return (
        <div className='home-container'>
            <div className='home-title'> <span>LUMA</span> tables</div>
            <div className='table-container'>
                {tables.map((item) => (
                    item.state === "Empty" ? (
                        <Link to="/order" key={item.id} onClick={() => handleSelectedTable(item.table_no)}>
                            <TableComponent
                                tableNumber={item.table_no < 10 ? `0${item.table_no}` : item.table_no}
                                tableState={item.state}
                            />
                        </Link>
                    ) : (
                        <Link to="/order" key={item.id} onClick={() => handleSelectedTable(item.table_no)}>
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

export default HomePage;