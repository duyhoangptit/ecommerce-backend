const Comment = require('../models/comment.model')
const {convert2ObjectId} = require("../utils");
const {Api404Error} = require("../core/error.response");

/**
 * key features: Comment service
 * - add comment [User, Shop]
 * - get a list of comment [User, Shop]
 * - delete a comment [User, Shop , Admin]
 */
class CommentService {
    static async createComment({
        productId, userId, content, parentCommentId = null
                               }) {
        const comment = new Comment({
            comment_product_id: productId,
            comment_user_id: userId,
            comment_content: content,
            comment_parent_id: parentCommentId
        })

        let rightValue = 0
        if (parentCommentId) {
            // reply comment
            const parentComment = await Comment.findById(parentCommentId)
            if (!parentComment) throw new Api404Error('Parent comment not found')

            rightValue = parentComment.comment_right

            // updateMany comments
            await Comment.updateMany({
                comment_product_id: convert2ObjectId(productId),
                comment_right: { $gte: rightValue}
            }, {
                $inc: {comment_right: 2}
            })

            // updateMany comments
            await Comment.updateMany({
                comment_product_id: convert2ObjectId(productId),
                comment_left: { $gt: rightValue}
            }, {
                $inc: {comment_left: 2}
            })
        } else {
            const maxRightValue = await Comment.findOne({
               comment_product_id: convert2ObjectId(productId)
            }, 'comment_right', {sort: {comment_right: -1}})
            if (maxRightValue) {
                rightValue = maxRightValue.comment_right + 1
            } else {
                rightValue = 1
            }
        }

        console.log('rightValue::', rightValue)
        // insert to comment
        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1;

        await comment.save()
        return comment
    }

    static async getCommentsByParentId({
        productId,
        parentCommentId = null,
        limit = 50,
        offset = 0
    }){
        if (parentCommentId) {
            const parent = await Comment.findById(parentCommentId)
            if (!parent) throw new Api404Error('Not found comment for product')

            return Comment.find({
                comment_product_id: convert2ObjectId(productId),
                comment_left: {$gt: parent.comment_left},
                comment_right: {$lte: parent.comment_right}
            }).select({
                comment_left: 1,
                comment_right: 1,
                comment_content: 1,
                comment_parent_id: 1
            }).sort({
                comment_left: 1
            });
        }

        return Comment.find({
            comment_product_id: convert2ObjectId(productId),
            comment_parent_id: parentCommentId
        }).select({
            comment_left: 1,
            comment_right: 1,
            comment_content: 1,
            comment_parent_id: 1
        }).sort({
            comment_left: 1
        });
    }
}

module.exports = {CommentService}