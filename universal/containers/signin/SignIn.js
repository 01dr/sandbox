/**
 * Created by invader on 28.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

import SignInForm from '../../components/signInForm/SignInForm'

class SignIn extends React.Component {
    render() {
        return  <div><SignInForm/></div>
    }
}

export default connect(() => ({}))(SignIn)