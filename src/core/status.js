const STATUS = {
    OK: {status: 200, reason: 'Success'},
    CREATED: {status: 201, reason: 'Created success'},
    BAD_REQUEST: {status: 400, reason: 'Bad request error'},
    UN_AUTHORIZATION: {status: 401, reason: 'Forbidden error'},
    FORBIDDEN: {status: 403, reason: 'Forbidden error'},
    NOT_FOUND: {status: 400, reason: 'Resource not found'},
    CONFLICT: {status: 409, reason: 'Conflict error'},
    SERVER: {status: 500, reason: 'Internal Server Error'},
}

module.exports = {
    STATUS
}