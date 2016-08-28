/**
 * Created by invader on 28.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

import {loginUser} from '../../actions/UserActions'

class SignInForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: this.props.email || '',
            password: this.props.password || '',
            emailError: false,
            passwordError: false
        }
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const mailRegExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z]|digital|xxx)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        let errors = false;
        this.setState({
            emailError: false,
            passwordError: false
        });

        if (this.props.password === '') {
            errors = true;
            this.setState({passwordError: true});
        }

        if (!mailRegExp.test(this.state.email)) {
            errors = true;
            this.setState({emailError: true});
        }

        if (!errors) {
            this.props.dispatch(loginUser({
                username: this.state.email,
                password: this.state.password
            }));
        }
    }

    render() {
        return  <div>
                    <form onSubmit={::this.handleSubmit}>
                        <fieldset>
                            <legend>Sign in</legend>
                            <input
                                type="email"
                                placeholder="Username"
                                onChange={::this.handleEmailChange} /><br/>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={::this.handlePasswordChange} /><br/>
                            <button type="submit">Login</button>
                        </fieldset>
                    </form>
                </div>
    }
}

export default connect(() => ({}))(SignInForm)