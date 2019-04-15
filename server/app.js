/* eslint-disable no-unused-vars */
const chalk = require('chalk');
const express = require('express');
const expressValidator = require('express-validator');
const serveIndex = require('serve-index');
const bodyParser = require('body-parser');
const glob = require('glob');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// Load environment variables.
require('dotenv').config();

const fs = require('fs');
const app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/', express.static('./public'));
//app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials: true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, *, Accept, x-authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

const initRoutes = (app) => {
  // including all routes
  glob('./routes/*.js', (err, routes) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Error occured including routes');
      return;
    }
    routes.forEach((routePath) => {
      require(routePath).routes(app); // eslint-disable-line
    });
    // eslint-disable-next-line no-console
    console.warn('No of routes file : ', routes.length);
  });
};

initRoutes(app);

app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.blue('App listening on port 8080!'));
});