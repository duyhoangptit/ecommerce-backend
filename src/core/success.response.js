const {STATUS} = require("./status");

class SuccessResponse {

    constructor({message, status = STATUS.OK.status, data = {}, options = {}}) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.options = options;
    }

    send(res, headers = {}) {
        return res.status(this.status)
            .json(this)
    }
}

class Ok extends SuccessResponse {
    constructor({message, data = {}, options = {}}) {
       super({message, data, options})
    }
}


class Create extends SuccessResponse {
    constructor({message, data = {}, options = {}}) {
        super({message, status: STATUS.CREATED.status, data, options})
    }
}

const CREATED = (res, message, data) => {
    new Create({
        message,
        data
    }).send(res)
}

const OK = (res, message, data) => {
    new Ok({
        message,
        data
    }).send(res)
}


module.exports = {
    OK,
    CREATED
}