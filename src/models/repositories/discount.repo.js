const {unGetSelectData, getSelectData} = require("../../utils");
const findAllDiscountCodesUnSelect = async ({
    limit = 50, page = 1, sort = 'ctime',
    filter, unSelect, model}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1}
    return await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unGetSelectData(unSelect))
        .lean();
}

const findAllDiscountCodesSelect = async ({
                                                limit = 50, page = 1, sort = 'ctime',
                                                filter, select, model}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1}
    return await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean();
}

const checkDiscountExists =  async (model, filter) => {
}

module.exports = {
    findAllDiscountCodesUnSelect,
    findAllDiscountCodesSelect,
    checkDiscountExists
}