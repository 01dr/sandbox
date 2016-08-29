/**
 * Created by invader on 28.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

import Menu from '../../components/menu/Menu'
import Container from '../../components/container/Container'
import SignUpForm from '../../components/signUpForm/SignUpForm'

class SignUp extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Menu/>
                    <h1>Sign up</h1>
                    <SignUpForm/>
                </Container>
            </div>
        )
    }
}

export default connect(() => ({}))(SignUp)