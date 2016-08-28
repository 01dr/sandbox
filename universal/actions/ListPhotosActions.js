/**
 * Created by invader on 27.08.16.
 */

import req from 'superagent'
import { photosUrl, LIST_PHOTOS_REQUEST, LIST_PHOTOS_SUCCESS, LIST_PHOTOS_FAIL } from './constants'

export function listPhotos() {
    return dispatch => {
        dispatch(listPhotosRequest());

        return req
            .get(photosUrl)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch(listPhotosFail(err));
                } else {
                    dispatch(listPhotosSuccess(res.body));
                }
            })
    }
}

export function listPhotosRequest() {
    return {type: LIST_PHOTOS_REQUEST}
}

export function listPhotosSuccess(listPhotos) {
    return {type: LIST_PHOTOS_SUCCESS, listPhotos}
}

export function listPhotosFail(error) {
    return {type: LIST_PHOTOS_FAIL, error}
}