import React, { Component } from 'react';

class TableHeader extends Component {

    sortColumn = path => {
        let sortColumn = {...this.props.sortColumn};

        if (path === sortColumn.path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'desc';
        }

        this.props.onSort(sortColumn);
    }

    renderSortIcon = column => {
        const { sortColumn } = this.props;
        if(!sortColumn) return null;
        if(column.path !== sortColumn.path) return null;

        if(sortColumn.order === "asc") return <span>&darr;</span>;
        return <span>&uarr;</span>;
    }

    render() { 
        const {columns} = this.props;
        return ( 
            <thead className="">
                <tr>
                    {columns.map(column => (
                        <th key={column.path || column.key} onClick={() => this.sortColumn(column.path)} >
                            {column.label} {this.renderSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;