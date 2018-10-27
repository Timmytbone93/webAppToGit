import React, { Component } from 'react';
import './CSS/TableHeader.css'


class TableHeaderColumn extends Component {

    render() {
        return (
            <thead>
                <tr>
                {this.generateHeaders()}
                </tr>
            </thead>
        );
    }


    generateHeaders = () => {
        const tableHeaders = this.props.headers.map(headers => {
            return <th key={headers.accessor}>{headers.header}</th>
        });
        return tableHeaders
    }
}


export default TableHeaderColumn