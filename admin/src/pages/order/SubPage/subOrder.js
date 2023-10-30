import React, { useContext, useEffect } from 'react'

import "../styles/subOrder.css";
import { WorkBarContext } from '../../../context/WorkBarContext';
import ShowOrder from '../component/ShowOrder';

const Ordering = () => {
    let { API_ENDPOINT, selectedTable, tables, setTables, setSelectedTable } = useContext(WorkBarContext);

    useEffect(() => {
        const table = tables.find((table) => table.table_no === selectedTable);
        if (!table || table.state !== "Dining" || table.order_state !== "Order") {
            setSelectedTable();
        }
    }, [selectedTable, tables]);

    const handleChange = async () => {
        const table = tables.find((table) => table.table_no === selectedTable);
        if (table && table.state === "Dining" && table.order_state === "Order") {
            table.order_state = "Cook";
            alert("Do You Want To Update?");
            try {
                const response = await fetch(API_ENDPOINT + `api/table/update/${table.id}/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newOrderState: "Cook",
                    }),
                });

                if (response.ok) {
                    //   const data = await response.json();
                    //   const updatedTablesResponse = await fetch(API_ENDPOINT + 'api/gettable/');
                    //   const updatedTablesData = await updatedTablesResponse.json();
                    //   setTables(updatedTablesData);
                    console.log("updated");
                } else {
                    alert("Error updating table");
                }
            } catch (error) {
                console.error(error);
                alert("Error updating table");
            }
        } else {
            alert("Error updating table");
        }
    };


    return (
        <div className="center rOrderPage-container">
            <div className="r2-container">
                <div className="inner-container">
                    <div className="title center">
                        <h2>Orders:  {selectedTable ? <span>{selectedTable}</span> : ""}</h2>
                    </div>

                    <div className="tableWrap">
                        <ShowOrder selectedTable={selectedTable} />
                    </div>

                    <div className="btn-container center flex-row">
                        <button onClick={handleChange}>Cook</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Ordering;