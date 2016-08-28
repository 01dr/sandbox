/**
 * Created by invader on 26.08.16.
 */

import req from 'superagent'

import { ADD_PHOTO_REQUEST, ADD_PHOTO_SUCCESS, ADD_PHOTO_FAIL, photosUrl } from './constants'

export function addPhoto(photo) {
    console.log('Add photo', photo);
    return dispatch => {
        dispatch(addPhotoRequest(photo));

        return req
            .post(photosUrl)
            .send(photo)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(addPhotoFailure(err, photo))
                } else {
                    dispatch(addPhotoSuccess(res.body))
                }
            })
    }
}

export function addPhotoRequest(photo) {
    return {
        type: ADD_PHOTO_REQUEST,
        photo,
    };
}

export function addPhotoFailure(error, photo) {
    return {
        type: ADD_PHOTO_FAIL,
        photo,
        error,
    };
}

export function addPhotoSuccess(photo) {
    return {
        type: ADD_PHOTO_SUCCESS,
        photo,
    };
}