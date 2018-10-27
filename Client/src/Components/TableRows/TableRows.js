import React, { Component } from 'react'
import "./CSS/TableRows.css"

class TableRows extends Component {
    
    render() {
        return (
            <tbody>
                {this.generateRows()}
            </tbody>
        );
    }

    generateRows = () => {
        var id = 0;
        const rows = this.props.rowData.map(obj => {
            id++;
        const data = <tr key={id}>{this.props.headers.map(x => {
                id++;
                return <td key={id}>{obj[x.accessor]}</td>
            })}</tr>;
            
            return data;
        });
        return rows;

    }
}


export default TableRows