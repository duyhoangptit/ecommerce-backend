const Comment = require('../models/comment.model')
const {convert2ObjectId} = require("../utils");
const {Api404Error} = require("../core/error.response");
const {ProductService} = require("./product.service");

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
        await this.validateProductExists(productId)

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

    static async validateProductExists(productId) {
        // check product exists in the database
        const foundProduct = await ProductService.findProductById(productId)
        if (!foundProduct) throw Api404Error('Product not found')
    }

    static async deleteComment({
                                   productId,
                                   commentId
                               }) {
        await this.validateProductExists(productId)

        // detect left and right of commentId
        const comment  = await Comment.findById(commentId);
        if (!comment) throw Api404Error('Comment not found')

        // get left, right
        const leftValue = comment.comment_left
        const rightValue = comment.comment_right

        // cal width
        const width = rightValue - leftValue + 1

        // remove all comment id children
        await Comment.deleteMany({
            comment_product_id: convert2ObjectId(productId),
            comment_left: {$gte: leftValue, $lte: rightValue}
        })

        // update value left and right
        await Comment.updateMany({
            comment_product_id: convert2ObjectId(productId),
            comment_right: {$gt: rightValue}
        }, {
            $inc: {comment_right: -width}
        })

        await Comment.updateMany({
            comment_product_id: convert2ObjectId(productId),
            comment_left: {$gt: leftValue}
        }, {
            $inc: {comment_left: -width}
        })

        return true
    }
}

module.exports = {CommentService}