/**
 * Created by x22a on 25.02.16.
 */

import React from 'react';
import { connect } from 'react-redux'

import { listPhotos } from '../../actions/ListPhotosActions'

import s from './main.pcss';

class Main extends React.Component {
    componentDidMount() {
        this.props.dispatch(listPhotos());
    }

    render() {
        return  <div className={s.photos}>
                    {this.props.photos.map((photo, i) => {
                        return (<div key={i}>
                            <h2>{photo.title}</h2>
                            <img src={photo.path} />
                        </div>);
                    })}
                </div>;
    }
}

export default connect(store => ({ photos: store.listPhotos }))(Main)