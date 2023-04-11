const {RoleModel} = require("../role.model");
const {ResourceModel} = require("../resource.model");
const {findByUserIdAndState} = require("./user.repository");
const {BusinessLogicError} = require("../../core/error.response");

const createResource = async ({
    name = 'profile',
    slug = 'p00001',
    description = ''
                        }) => {
    // 1. Check name or slug exists

    // 2. new resource
    const resource = await ResourceModel.create({
        src_name: name,
        src_slug: slug,
        src_description: description
    })

    return resource
}

const resourceList = async ({
    userId = '',
    limit = 30,
    offset = 0,
    search = ''
                            }) => {
    // check admin ? middleware func

    // get list of resource
    return await ResourceModel.aggregate({
        $project: {
            _id: 0,
            name: '$src_name',
            slug: '$src_slug',
            description: '$src_description',
            resourceId: '$_id',
            createdAt: 1
        }
    })
}

const createRole = async ({
      name = 'shop',
      slug = 's00001',
      description = '',
      grants = []
                    }) => {
    // check role exists
    // nre role
    return await RoleModel.create({
        role_name: name,
        role_slug: slug,
        role_description: description,
        role_grants: grants
    })
}

const searchRoleListOfUser = async ({
                            userId = '',
                            limit = 30,
                            offset = 0,
                            search = ''}) => {
}

const getRoleListOfUser = async ({
    userId = ''}) => {
    try {
        // get role of user
        const foundUser = await findByUserIdAndState(userId)
        const roleCodes = foundUser.usr_role

        // get role detail
        const roles = await RoleModel.aggregate(
                {
                    $match: {
                        role_code: {$in: roleCodes}
                    }
                },
                {
                    // phan giai record
                    $unwind: '$role_grants'
                },
                {
                    $lookup: {
                        from: 'Resources',
                        localField: 'role_grants.resource',
                        foreignField: '_id',
                        as: 'resource'
                    }
                },
                {
                    $unwind: '$resource'
                },
                {
                    $project: {
                        role: '$role_name',
                        resource: '$resource.src_name',
                        action: '$role_grants.actions',
                        attributes: '$role_grants.attributes'
                    }
                },
                {
                    $unwind: '$action'
                },
                {
                    $project: {
                        _id: 0,
                        role: 1,
                        resource: 1,
                        action: '$action',
                        attributes: 1,
                    }
                },
            )

        return roles
    } catch (e) {
        throw new BusinessLogicError(e)
    }
}

module.exports = {
    createResource,
    resourceList,
    createRole,
    getRoleListOfUser,
    searchRoleListOfUser
}
