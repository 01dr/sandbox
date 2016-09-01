import passport from 'passport'
import bcrypt from 'bcrypt'
import validator from 'validator'

import * as db from './service/db';

export function signUp(req, res, next) {
    let validationResult = validateSignUpForm(req.body);
    if (!validationResult.success) {
        return res
            .status(400)
            .json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
    }

    return passport.authenticate('local-signup', (err) => {
        if (err) {
            return res
                .status(400)
                .json({error: err});
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
}

export function signIn(req, res, next) {
    let validationResult = validateSignInForm(req.body);
    if (!validationResult.success) {
        return res
            .status(400)
            .json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            })
    }

    return passport.authenticate('local-signin', (err, token, userData) => {
        if (err) {
            res.status(400);
            res.json({error: err});
        }

        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
}

function validateSignUpForm(payload) {
    let isFormValid = true;
    let errors = {};
    let message = '';

    if (!payload.email || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "Please provide a correct email address.";
    }

    if (!payload.password || !validator.isLength(payload.password, 8)) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (!payload.name || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = "Please provide your name.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message: message,
        errors: errors
    };
}

function validateSignInForm(payload) {
    let isFormValid = true;
    let errors = {};
    let message = '';

    if (!payload.email || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = "Please provide your email address.";
    }

    if (!payload.password || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = "Please provide your password.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message: message,
        errors: errors
    };
}