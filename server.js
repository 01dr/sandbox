import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import express from 'express';
import expressSession from 'express-session';
import http from 'http';
// import socketIO from 'socket.io';
import config from 'config';

import webpackDevMiddleware from 'webpack-dev-middleware';

import * as api from './server/api/http';
import * as userAPI from './server/api/user';
import * as uni from './server/app.js';
import * as db from './server/api/service/db';
import webpackConfig from './webpack.config';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

import passport from 'passport'

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
}));

app.use(passport.initialize());

// load passport strategies
const localSignUpStrategy = require('./server/passport/local-signup');
const localSignInStrategy = require('./server/passport/local-signin');
passport.use('local-signup', localSignUpStrategy);
passport.use('local-signin', localSignInStrategy);




app.set('views', path.join(__dirname, 'server', 'view'));
app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/fonts', express.static(path.join(__dirname, '/fonts')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'let me down easy',
    resave: false,
    saveUninitialized: false,
}));

app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));
// app.get('/app.css', (req, res) => res.sendFile(path.join(__dirname, 'partials', 'app.css')));


app.post('/api/v1/signup', userAPI.signUp);
app.post('/api/v1/signin', userAPI.signIn);
app.post('/api/v1/photos', api.addPhoto);
app.get('/api/v1/photos', api.listPhotos);

/**
 * Universal Application endpoint
 */
app.get('*', uni.handleRender);

httpServer.listen(port);