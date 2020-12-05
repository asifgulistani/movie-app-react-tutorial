import React from 'react';

const Select = ({name, label, options, error, ...rest }) => {

    return ( 
        <div className="form-group">
            <label htmlFor="genre">{label}</label>
            <select 
                className="form-control" 
                name={name}
                {...rest}>
                    <option value="" />
                    {options.map(genre => (
                        <option key={genre._id} value={genre._id} >
                            {genre.name}
                        </option>
                    ))}
            </select>
            {error && <small className="form-text text-danger">{error}</small>}
        </div>
    );
}
 
export default Select;