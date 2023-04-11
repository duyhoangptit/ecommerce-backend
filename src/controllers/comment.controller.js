const {CommentService} = require('../services/comment.service')
const catchAsync = require('../helpers/catch.async')
const {OK} = require("../core/success.response");

class CommentController {
    createComment = catchAsync(async(req, res, next) => {
        OK(res,  "Create comment success", await CommentService.createComment(req.body))
    });

    getCommentsByParentId = catchAsync(async(req, res, next) => {
        OK(res,  "Get comment success", await CommentService.getCommentsByParentId(req.query))
    });

    deleteComment =  catchAsync(async(req, res, next) => {
        OK(res,  "Delete comment success", await CommentService.deleteComment(req.query))
    });
}

module.exports = new CommentController()