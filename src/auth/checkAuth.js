const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const {findById} = require('../services/apiKey.service')
const URL_WHITELIST = [
    "/api-docs",
    "/healthcheck",
    "/api/v1/auth/register"
]

const apiKey = async (req, res, next) => {
    try {
        if (ignoreWhiteList(req)) return next()

        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return returnForbiddenError(res);
        }
        // check objKey
        const objKey = await findById(key)
        if (!objKey) {
            return returnForbiddenError(res);
        }

        req.objKey = objKey

        return next()
    } catch (error) {
        return returnForbiddenError(res);
    }
}

const permission = (permissions) => {
    return (req, res, next) => {
        if (ignoreWhiteList(req)) return next()

        if (!req.objKey.permissions) {
            return returnPermissionDenied(res);
        }

        console.log("permissions::", req.objKey.permissions)
        const validPermission = req.objKey.permissions.includes(permissions)

        if (!validPermission) {
            return returnPermissionDenied(res);
        }

        return next()
    }
}

const throwApi403Error = message => {
    return {
        message: message
    }
}

const returnApi403Error = (res, message) => {
    return res.status(403).json(throwApi403Error(message))
}

const returnForbiddenError = res => {
    return returnApi403Error(res, 'Forbidden Error')
}

const returnPermissionDenied = res => {
    return returnApi403Error(res, 'Permission denied')
}

const ignoreWhiteList = (request) => {
	return URL_WHITELIST.includes(request.url);
}

module.exports = {
    apiKey,
    permission,
    ignoreWhiteList
}
