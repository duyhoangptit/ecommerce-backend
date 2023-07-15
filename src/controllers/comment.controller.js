const {CommentService} = require('../services/comment.service')
const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");

class CommentController {
    createComment = catchAsync(async(req, res, next) => {
        OK(res,  "Comment success", await CommentService.createComment(req.body))
    });

    getCommentsByParentId = catchAsync(async(req, res, next) => {
        OK(res,  "Comment success", await CommentService.getCommentsByParentId(req.query))
    });
}

module.exports = new CommentController()