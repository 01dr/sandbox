/**
 * Created by invader on 29.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import s from './menu.pcss'

class Menu extends React.Component {
    render() {
        return  <div className={s.menu}>
                    <Link to="/">/home</Link> <Link to="/signup">/signup</Link> <Link to="/signin">/signin</Link>
                </div>
    }
}

export default connect(() => ({}))(Menu)