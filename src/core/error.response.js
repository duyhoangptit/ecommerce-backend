const {STATUS} = require("./status");

class BaseError extends Error {
    constructor(message, status, errors, isOperational) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        this.status = status
        this.errors = errors
        this.isOperational = isOperational
        Error.captureStackTrace(this, this.constructor)
    }
}

class Api409Error extends BaseError {
    constructor(message = STATUS.CONFLICT.reason, errors = [], status = STATUS.CONFLICT.status, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

class Api403Error extends BaseError {
    constructor(message = STATUS.FORBIDDEN.reason, errors = [], status = STATUS.FORBIDDEN.status, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

class BusinessLogicError extends BaseError {
    constructor(message = STATUS.SERVER.reason, errors = [], status = STATUS.SERVER.status, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

class Api404Error extends BaseError {
    constructor(message = STATUS.NOT_FOUND.reason, errors = [], status = STATUS.NOT_FOUND.status, isOperational = true) {
        super(message, status, errors, isOperational);
    }
}

module.exports = {
    Api403Error,
    Api404Error,
    Api409Error,
    BusinessLogicError,
    BaseError,
    STATUS
}