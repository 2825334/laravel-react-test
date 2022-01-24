import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { cond } from 'lodash';

function TableComponents(props) {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (props.fetch == true) {
            setTableData([]);
        }
        
        const fetchData = async () => {
            try {
                const result = await fetch(`api/users`);
                const body = await result.json();
                setTableData(body.data);
            } catch(err) {
                // error handling code
            } 
        }
        fetchData()
    }, [])

    const handleFetch = async () => {
        try {
            const result = await fetch(`api/users`);
            const body = await result.json();
            setTableData(body.data);
        } catch(err) {
            // error handling code
        } 
    }
    
    return (
		<div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
                <div className="wrapper">
                    <div className="row no-gutters">
                  
                        <div className="col-md-12 d-flex align-items-stretch">
                            
                            <div className="contact-wrap w-100 p-md-5 p-4">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type='submit' className="btn btn-primary" onClick={handleFetch} value={'Refresh'}/>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            tableData.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.address}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default TableComponents;
