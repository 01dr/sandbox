/**
 * Created by invader on 29.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import s from './menu.pcss'

class Menu extends React.Component {
    render() {
        let menu;
        // if (locals.user) {
        //     menu = '<Link to="/">/home</Link> <Link to="/post">/post</Link> <Link to="/logout">/logout</Link>';
        // } else {
        //     menu = '<Link to="/">/home</Link> <Link to="/signup">/signup</Link> <Link to="/signin">/signin</Link>'
        // }
        console.log();

        return  <div className={s.menu}>
                    {menu}
                </div>
    }
}

export default connect(() => ({}))(Menu)