/**
 * Created by invader on 28.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

import {registerUser} from '../../actions/UserActions'

class SignUpForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: this.props.name || '',
            email: this.props.email || '',
            password: this.props.password || ''
        }
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(registerUser({
            username: this.state.email,
            role: 'common-user',
            name: this.state.name,
            password: this.state.password
        }));
    }

    render() {
        return  <div>
                    <form onSubmit={::this.handleSubmit}>
                        <fieldset>
                            <legend>Sign up</legend>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={::this.handleNameChange} /><br/>
                            <input
                                type="email"
                                placeholder="E-mail"
                                onChange={::this.handleEmailChange} /><br/>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={::this.handlePasswordChange} /><br/>
                            <button type="submit">Register</button>
                        </fieldset>
                    </form>
                </div>
    }
}

export default connect(() => ({}))(SignUpForm)