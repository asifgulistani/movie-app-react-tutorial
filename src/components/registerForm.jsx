import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class RegisterForm extends Form {

    state = { 
        data: {
            name: '',
            email: '',
            password: ''
        },
        errors: {}
     }

    schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    };
        
    doSubmit = e => {
        console.log('submitted');
    }
    
    render() { 
        return ( 
            <div className="row pt-5">
                <div className="col-4 offset-4">
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('name','Name')}
                        {this.renderInput('email','Email', 'email')}
                        {this.renderInput('password','Password', 'password')}

                        {this.renderSubmitBtn('Register Now')}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default RegisterForm;