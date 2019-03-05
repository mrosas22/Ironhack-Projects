require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session");
//Import passport setup from config folder
const passportSetup = require('./config/passport-setup/passport-setup')

mongoose
  .connect('mongodb://localhost/Plan-tracker', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//create a partial folder inside view to store our partials
hbs.registerPartials(__dirname + '/views/partials');

//handle sessions here:
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

// default value for title local
app.locals.title = '21 Days Tracker - Break Free';

//Must come after the session
passportSetup(app); //<===Pass app to have it available in passportSetup function

// Routes middleware goes here
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth-routes'));
app.use('/user', require('./routes/user-routes'));
app.use('/plans', require('./routes/plan-routes'));
app.use('/', require('./routes/routine-routes'));
app.use('/therapy', require('./routes/therapy-routes'));
app.use('/feedback', require('./routes/feedback-routes'));

module.exports = app;