/**
 * Created by x22a on 25.02.16.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/main/Main';
import Upload from './containers/upload/Upload'

import SignUp from './containers/signup/SignUp'
import SignIn from './containers/signin/SignIn'

export default (
    <Route path='/'>
        <IndexRoute component={ Main } />
        <Route path="/upload" component={ Upload } />

        <Route path="/signup" component={ SignUp } />
        <Route path="/signin" component={ SignIn } />
    </Route>
);