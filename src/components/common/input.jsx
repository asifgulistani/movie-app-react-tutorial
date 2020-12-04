import React from 'react';

const Input = ({ name, label, error, value, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                name={name}
                value={value}
                onChange={onChange}
                id={name}   
                type="text"
                className="form-control"   
                aria-describedby="emailHelp"/>
            {error && <small className="form-text text-danger">{error}</small>}
        </div>
     );
}
 
export default Input;