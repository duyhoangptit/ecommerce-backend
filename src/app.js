// config env
require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const app = express();
const compression = require('compression');
const cookieParser = require('cookie-parser');

// init middlewares
app.use(morgan('dev'));
// app.use(morgan('compile'));
// app.use(morgan('common'));
// app.use(morgan('short'));
// app.use(morgan('tiny'));

// setting security helmet
const helmet = require('helmet');
// setting base
app.use(helmet.frameguard({
    action: 'deny'
}));
// strict transport security
const reqDuration = 2629746000;
app.use(
    helmet.hsts({
        maxAge: reqDuration,
    })
);

// content security policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
    },
}))
// x content type options
app.use(helmet.noSniff());
// x xss protection
app.use(helmet.xssFilter())
// referrer policy
app.use(helmet.referrerPolicy({
    policy: "no-referrer",
}))

// down size response
app.use(compression());

// setting body parser, cookie parser
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

// init db
require('./dbs/init.mongodb.lv0');
const {checkOverload} = require('./helpers/check.connect');
checkOverload();

// init routes
app.use('', require('./routes'))

// handling errors
const {logErrorMiddleware, returnError, is404Handler, isOperationalError} = require("./middleware/errorHandler");
const {exit} = require("./middleware/common");
app.use(is404Handler)
app.use(logErrorMiddleware)
app.use(returnError)

// if the Promise is rejected this will catch it
process.on('SIGINT', () => {
    console.log('Ctrl + C:: Service stop!!!')
    exit()
});  // CTRL+C
process.on('SIGQUIT', () => {
    console.log('Keyboard quit:: Service stop!!!')
    exit()
}); // Keyboard quit
process.on('SIGTERM', () => {
    console.log('Kill command:: Service stop!!!')
    exit()
}); // `kill` command

// catch all uncaught exceptions
process.on('unhandledRejection', error => {
    throw error
})

process.on('uncaughtException', error => {
    // if isOperational is false -> exit service
    if (!isOperationalError(error)) {
        exit()
    }
})

module.exports = app;