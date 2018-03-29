const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./mongoose.config');
const app = express();
const publicDir = 'public';
const faviconDir = `${publicDir}/images`;
const faviconName = 'favicon.ico';
const expires = 1000 * 60 * 60 * 24 * 7;
const sessionOptions = {
  // secret: process.env.SECRET_KEY,
  secret: 'secret',
  key: 'admin',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    // path: '/',
    secure: true,
    httpOnly: true,
    maxAge: expires
  }
};
app
  // .disable('x-powered-by')
  .use(morgan('dev'))
  // .use(favicon(path.join(process.cwd(), faviconDir, faviconName)))
  .use(express.static(path.join(process.cwd(), publicDir)))
  .use(bodyParser.json({ type: 'text/plain' }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(session(sessionOptions))
  .use(passport.initialize())
  // .use(passport.initialize({ userProperty: 'payload' }))
  .use(passport.session());

module.exports = app;
