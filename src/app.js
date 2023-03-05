// config env
require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

// init middlewares
app.use(morgan('dev'));
app.use(morgan('compile'));
app.use(morgan('common'));
app.use(morgan('short'));
app.use(morgan('tiny'));

app.use(helmet());

// down size response
app.use(compression());

// setting body parser, cookie parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// init db
require('./dbs/init.mongodb.lv0');
const {checkOverload} = require('./helpers/check.connect');
checkOverload();

// init routes
app.use('', require('./routes'))

// handling errors

module.exports = app;