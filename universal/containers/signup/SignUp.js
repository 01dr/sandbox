/**
 * Created by invader on 28.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

import SignUpForm from '../../components/signUpForm/SignUpForm'

class SignUp extends React.Component {
    render() {
        return  <div>
                    <SignUpForm/>
                </div>
    }
}

export default connect(() => ({}))(SignUp)