const {Api404Error, BaseError} = require("../core/error.response")

const logError = (err) => {
    console.error(err)
}

const logErrorMiddleware = (err, req, res, next) => {
    logError(err)
    next(err)
}

const returnError = (err, req, res, next) => {
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Internal server error',
        errors: err.errors
    })
}

const isOperationalError = (error) => {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

const is404Handler = (req, res, next) => {
    const error = new Api404Error('Resource not found')
    error.status = 404
    next(error)
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError,
    is404Handler
}