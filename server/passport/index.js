/**
 * Created by invader on 30.08.16.
 */

import passport from 'passport'

module.exports = function(config) {
    const localSignUpStrategy = require('./local-signup')(config);
    const localSignInStrategy = require('./local-signin')(config);

    passport.use('local-signup', localSignUpStrategy);
    passport.use('local-signin', localSignInStrategy);
};