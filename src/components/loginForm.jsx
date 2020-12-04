import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form'

class LoginForm extends Form {
    state = { 
        data: {
            username: '',
            password: ''
        },
        errors: {}
     }

    schema = {
        username: Joi.string().min(5).required(),
        password: Joi.string().required()
    };
        
    doSubmit = e => {
        console.log('submitted');
    }

    render() { 
        const { data, errors } = this.state;
        return ( 
            <div className="row pt-5">
                <div className="col-4 offset-4">
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('username', 'Username')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderSubmitBtn('Login')}
                    </form>
                </div>
            </div>
         );
    }
}
 
export default LoginForm;