/**
 * Created by invader on 30.08.16.
 */

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as db from '../api/service/db'
import config from 'config'

const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordFiend: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    process.nextTick(() => {
        const validateUser = (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: `Unknown user: ${email}` }); }

            if (bcrypt.compareSync(password, user.password)) {
                const payload = {sub: user.id};
                const token = jwt.sign(payload, config.get('jwtSecret'));
                return done(null, token, user);
            } else {
                return done(null, false, { message: 'Invalid username or password...' });
            }
        };

        db.findUserByEmail(email, validateUser);
    });
});