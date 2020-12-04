import React, { Component } from 'react';
import get from '../../utils/object';

class TableBody extends Component {
    state = {  }

    renderCell = (item, column)=>{
        if(column.content) return column.content(item);

        return get(column.path, item);
    }

    createKey = (item, column) => item._id + (column.path || column.key);

    render() { 
        const {data, columns} = this.props;
        return ( 
            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
                        {columns.map(column => <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>)}
                    </tr>
                ))}
            </tbody>
         );
    }
}
 
export default TableBody;