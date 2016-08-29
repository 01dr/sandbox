/**
 * Created by invader on 29.08.16.
 */

import React from 'react'
import {connect} from 'react-redux'

import s from './container.pcss'

class Container extends React.Component {
    render() {
        return (
            <div className={s.container}>
                {this.props.children}
            </div>
        )
    }
}

export default connect(() => ({}))(Container)