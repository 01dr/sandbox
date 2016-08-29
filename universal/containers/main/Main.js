import React from 'react';
import { connect } from 'react-redux'

// actions
import { listPhotos } from '../../actions/ListPhotosActions'

// styles
import s from './main.pcss';
import '../common/main.pcss'

// components
import Menu from '../../components/menu/Menu'
import Container from '../../components/container/Container'

class Main extends React.Component {
    componentDidMount() {
        this.props.dispatch(listPhotos());
    }

    render() {
        return  (
            <div>
                <Container>
                    <Menu/>
                    <h1>Home</h1>
                    <p>я ебал Вас в рiт.</p>
                </Container>
            </div>
        )
    }
}

export default connect(store => ({ photos: store.listPhotos }))(Main)