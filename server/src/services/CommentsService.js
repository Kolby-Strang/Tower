import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comment.find({ eventId }).populate('creator')
        return comments
    }
    async createComment(commentData) {
        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator')
        return comment
    }
    async destroyComment(commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (!comment) {
            throw new BadRequest(`${commentId} is an invalid Comment Id`)
        }
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden('NOT YOUR COMMENT TO DELETE')
        }
        comment.remove()
        return `Comment removed`
    }
}


export const commentsService = new CommentsService()