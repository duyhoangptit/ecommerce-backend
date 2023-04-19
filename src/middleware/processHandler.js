
// if the Promise is rejected this will catch it
const {exit} = require("./common");
const {logger} = require("../configs/config.logger");
const {isOperationalError} = require("./errorHandler");
process.on('SIGINT', () => {
    console.log('Ctrl + C:: Service stop!!!')
    exit()
});

// CTRL+C
process.on('SIGQUIT', () => {
    console.log('Keyboard quit:: Service stop!!!')
    exit()
});
// Keyboard quit
process.on('SIGTERM', () => {
    console.log('Kill command:: Service stop!!!')
    exit()
});
// `kill` command

// catch all uncaught exceptions
process.on('unhandledRejection', error => {
    logger.error(error)
    throw error
})

process.on('uncaughtException', error => {
    // if isOperational is false -> exit service
    if (!isOperationalError(error)) {
        exit()
    }
})

module.exports = this