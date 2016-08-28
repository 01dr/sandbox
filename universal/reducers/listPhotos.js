/**
 * Created by invader on 27.08.16.
 */

import { LIST_PHOTOS_SUCCESS } from '../actions/constants'

function listPhotos(state = [{}], action) {
    switch (action.type) {
        case LIST_PHOTOS_SUCCESS:
            return action.listPhotos;

        default:
            return state;
    }
}

export default {listPhotos}