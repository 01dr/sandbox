/**
 * Created by invader on 28.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

// styles
import '../common/main.pcss'

import Menu from '../../components/menu/Menu'
import Container from '../../components/container/Container'
import SignInForm from '../../components/signInForm/SignInForm'

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Menu/>
                    <h1>Sign in</h1>
                    <SignInForm/>
                </Container>
            </div>
        )
    }
}

export default connect(() => ({}))(SignIn)