import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                {...rest}
                name={name}
                id={name}   
                className="form-control"   
                aria-describedby="emailHelp"/>
            {error && <small className="form-text text-danger">{error}</small>}
        </div>
     );
}
 
export default Input;