/**
 * Created by invader on 26.08.16.
 */

import React from 'react'
import { connect } from 'react-redux'

import { addPhoto } from '../../actions/addPhotoActions'

import { Input, Button } from 'stardust'
import s from './upload.pcss'

class Upload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            title: this.props.title || '',
            path: this.props.path || ''
        };
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    hanglePathChange(e) {
        this.setState({path: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(addPhoto({ title: this.state.title, path: this.state.path }));
    }

    render() {
        return  <div>
                    <form encType='application/json' onSubmit={::this.handleSubmit}>
                        <fieldset>
                            <legend>Upload form</legend>
                            <Input
                                type="text"
                                placeholder="Title"
                                name='photo[title]'
                                onChange={::this.handleTitleChange} />
                            <Input
                                type="text"
                                placeholder="http://image.com"
                                name='photo[path]'
                                onChange={::this.hanglePathChange} />
                            <Button type="submit">Submit</Button>
                        </fieldset>
                    </form>
                </div>
    }
}

export default connect(store => ({}))(Upload)