class SuccessResponse {
    static successHandler(res, data, message = 'Success', status = 200) {
        return res.status(status).json({
            status: status,
            message: message,
            data: data
        })
    }
}

module.exports = SuccessResponse