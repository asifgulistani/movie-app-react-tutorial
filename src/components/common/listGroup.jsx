import React from 'react';

const ListGroup = probs => {

    const {
        items, 
        onItemSelected, 
        textProperty,
        selectedItem, 
        valueProperty,
        totalProperty
    } = probs;

    return ( 
        <ul className="list-group">
            {items.map(item => (
                <li key={item[valueProperty]} 
                    className={"list-group-item d-flex justify-content-between align-items-center " + (item !== selectedItem ? null : 'active')} 
                    onClick={() => onItemSelected(item)}>
                    {item[textProperty]}
                    {item[totalProperty] > 0 && (<span className="badge badge-info badge-pill">
                        {item[totalProperty]}
                    </span>)}
                </li>
            ))}
        </ul>
     );
}
 
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
    totalProperty: 'total',
};

export default ListGroup;