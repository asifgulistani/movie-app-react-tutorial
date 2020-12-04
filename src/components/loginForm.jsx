import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
    state = { 
        account: {
            username: '',
            password: ''
        },
        errors: {}
     }

    validate = () => {
        const {account} = this.state;
        const errors = {};

        if (account.username.trim() === '')
            errors.username = 'Username is required.';

        if (account.password.trim() === '')
            errors.password = 'Password is required.';

        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();

        this.setState({errors});

        if (Object.keys(errors).length > 0) 
            return false;

        console.log('submitted');
    }

    validateProperty = ({name, value}) =>{
        if (name === 'username'){
            if (value.trim() === '')
                return 'Username is required';
        }

        if (name === 'password'){
            if (value.trim() === '')
                return 'Password is required';
            if (value.length < 8)
                return 'Password lentgh should be greater or equal to 8 characters.';
        }
    }

    handleInputChange = ({currentTarget: input}) => {
        const {account} = this.state;
        const errors = {...this.state.errors};
        const errorInputMessage = this.validateProperty(input);

        if (errorInputMessage) errors[input.name] = errorInputMessage;
        else delete errors[input.name];

        account[input.name] = input.value;

        this.setState({account, errors});
    }

    render() { 
        const { account, errors } = this.state;
        return ( 
            <div className="row">
                <div className="col-4 offset-4">
                    <form onSubmit={this.handleSubmit}>
                        <Input 
                            name="username"
                            value={account.username}
                            label="Username"
                            onChange={this.handleInputChange}
                            error={errors.username}
                            />
                        <Input 
                            name="password"
                            value={account.password}
                            label="Password"
                            onChange={this.handleInputChange}
                            error={errors.password}
                            />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default LoginForm;