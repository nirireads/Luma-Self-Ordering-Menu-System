import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import "../styles/TableStat.css";

const TableStat = () => {
    const [tableStatistics, setTableStatistics] = useState({
        order: 0,
        cook: 0,
        prepared: 0,
        served: 0
    });
    const { API_ENDPOINT } = useContext(AuthContext);

    useEffect(() => {
        fetch(API_ENDPOINT + 'api/table-statistics/')
            .then(response => response.json())
            .then(data => {
                const updatedTableStatistics = {
                    order: data.Order || 0,
                    cook: data.Cook || 0,
                    prepared: data.Prepared || 0,
                    served: data.Served || 0
                };
                setTableStatistics(updatedTableStatistics);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='tableStat-container'>
            {/* <div className='title'>Table Statistics</div> */}
            <div className='tableStat-component'>
                <button className='tableStat-button'>
                    <div className='tableStat-top'>
                        <div className='tableStat-number'>Order</div>
                    </div>
                    <div className='tableStat-middle'>{tableStatistics.order}</div>
                </button>
            </div>
            <div className='tableStat-component'>
                <button className='tableStat-button'>
                    <div className='tableStat-top'>
                        <div className='tableStat-number'>Cook</div>
                    </div>
                    <div className='tableStat-middle'>{tableStatistics.cook}</div>
                </button>
            </div>
            <div className='tableStat-component'>
                <button className='tableStat-button'>
                    <div className='tableStat-top'>
                        <div className='tableStat-number'>Prepared</div>
                    </div>
                    <div className='tableStat-middle'>{tableStatistics.prepared}</div>
                </button>
            </div>
            <div className='tableStat-component'>
                <button className='tableStat-button'>
                    <div className='tableStat-top'>
                        <div className='tableStat-number'>Served</div>
                    </div>
                    <div className='tableStat-middle'>{tableStatistics.served}</div>
                </button>
            </div>


            {/* <h2>Table Statistics</h2>
            <p>Order: {tableStatistics.order}</p>
            <p>Cook: {tableStatistics.cook}</p>
            <p>Prepared: {tableStatistics.prepared}</p>
            <p>Served: {tableStatistics.served}</p> */}
        </div>
    );
};

export default TableStat;
