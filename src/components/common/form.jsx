import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }
    
    validate = () => {
        const errors = {};
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, option);

        if (!result.error) return null;

        for (let e of result.error.details)
            errors[e.path[0]] = e.message;

        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();

        this.setState({errors: errors || {}});

        if (errors) 
            return false;

        this.doSubmit(e);
    }

    validateProperty = ({name, value}) =>{
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return !error ? null : error.details[0].message;
    }

    handleInputChange = ({currentTarget: input}) => {
        const {data} = this.state;
        const errors = {...this.state.errors};
        const errorInputMessage = this.validateProperty(input);

        if (errorInputMessage) errors[input.name] = errorInputMessage;
        else delete errors[input.name];

        data[input.name] = input.value;

        this.setState({data, errors});
    }

    renderSubmitBtn = label => {
        return (<button
                    type="submit"
                    disabled={this.validate()}
                    className="btn btn-primary">{label}</button>);
    }

    renderInput = (name, label, type = 'text') =>{
        const { data, errors } = this.state;
        return (
            <Input 
                name={name}
                type={type}
                value={data[name]}
                label={label}
                onChange={this.handleInputChange}
                error={errors[name]}
            />
        );
    }

}
 
export default Form;