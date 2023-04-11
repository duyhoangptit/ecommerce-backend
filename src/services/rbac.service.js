const AccessControl = require('accesscontrol');
const rbac = new AccessControl()
const {getRoleListOfUser} = require("../models/repositories/role.repository");
const {Api403Error} = require("../core/error.response");

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            rbac.setGrants(await getRoleListOfUser({userId: req.userId}))
            const roles = req.user.roles
            let isAction = false
            for (const roleName in roles) {
                const permission = rbac.can(roleName)[action][resource]
                if (permission.granted) {
                    isAction = true
                    break
                }
            }

            if (!isAction) {
                return next(new Api403Error('Permission denied'))
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    grantAccess
}
