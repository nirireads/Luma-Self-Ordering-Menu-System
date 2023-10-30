import React, { useContext, useEffect } from 'react'

import { WorkBarContext } from '../../../context/WorkBarContext';
import ShowOrder from '../component/ShowOrder';

const Preparing = () => {

    let { API_ENDPOINT, selectedTable, setSelectedTable, tables, setTables } = useContext(WorkBarContext);

    useEffect(() => {
        const table = tables.find((table) => table.table_no === selectedTable);
        if (!table || table.state !== "Dining" || table.order_state !== "Cook") {
            setSelectedTable();
        }
    }, [selectedTable, tables, setSelectedTable]);

    const handleChange = () => {
        const table = tables.find((table) => table.table_no === selectedTable);
        if (table && table.state === "Dining" && table.order_state === "Cook") {
            table.order_state = "Prepared";
            alert("Do You Want To Update?");
            fetch(API_ENDPOINT + `api/table/update/${table.id}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newOrderState: "Prepared",
                }),
            })
                .then(response => response.json())
                .then(data =>
                    fetch(API_ENDPOINT + 'api/gettable/')
                        .then((response) => response.json())
                        .then((data) => setTables(data)))
        } else {
            alert("Error Updating");
        }
    };

    return (
        <div className="center rOrderPage-container">
            <div className="r2-container">
                <div className="inner-container">
                    <div className="title center">
                        <h2>Cooking: {selectedTable ? <span>{selectedTable}</span> : ""}</h2>
                    </div>

                    <div className="tableWrap">
                        <ShowOrder
                            selectedTable={selectedTable}
                        />
                    </div>
                    <div className="btn-container center flex-row">
                        <button onClick={handleChange}> Prepared</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preparing;