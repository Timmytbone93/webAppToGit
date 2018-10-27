import React, { Component } from 'react'
import TableHeaderColumn from '../TableHeaderColumn/TableHeaderColumn.js'
import Rows from '../TableRows/TableRows.js'
import  './CSS/Table.css'


class Table extends Component{

    render(){
        return(
            <div className="tableContainer">

                <table id="dashboardTable" className={this.props.tableClass}>
                    <TableHeaderColumn id="dashboardTH" headers={this.props.headers} rowData ={this.props.rowData}/>
                    <Rows headers={this.props.headers}  rowData={this.props.rowData} />
                </table>



            </div>
        );
    }
}


export default Table