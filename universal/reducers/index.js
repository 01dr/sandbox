/**
 * Created by x22a on 25.02.16.
 */

import dashboard from './dashboard';
import menu from './menu';

import listPhotos from './listPhotos'

import auth from './user'

export default Object.assign({}, listPhotos, dashboard, menu, auth);
