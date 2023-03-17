const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const {findById} = require('../services/apiKey.service')

const apiKey = async (req, res, next) => {
    try {
        console.log(JSON.stringify(req.headers));
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            });
        }
        // check objKey
        const objKey = await findById(key)
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            });
        }

        req.objKey = objKey

        return next()
    } catch (error) {

    }
}

const permission = (permissions) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }

        console.log("permissions::", req.objKey.permissions)
        const validPermission = req.objKey.permissions.includes(permissions)

        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }

        return next()
    }
}

module.exports = {
    apiKey,
    permission
}