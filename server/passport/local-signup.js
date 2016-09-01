/**
 * Created by invader on 30.08.16.
 */

import bcrypt from 'bcrypt'
import * as db from '../api/service/db'
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    process.nextTick(() => {
        const validateUser = (err, user) => {
            if (err) { return done(err); }
            if (user) { return done(null, false, { message: `Username already exist` }); }

            const newUser = req.body.user;
            newUser.password = bcrypt.hashSync(user.password, 8);
            db.saveUser(newUser,
                (err, saved) => {
                    console.log(`[DEBUG][saveUser] ${saved}`);
                    if ((err) || (!saved)) {
                        done(err)
                    } else {
                        done(null, newUser)
                    }
                }
            );
        };

        db.findUserByEmail(email, validateUser);
    });
});