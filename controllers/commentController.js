import mongoose from "mongoose";
import Comment from "../models/CommentModel.js";

// get all Comments

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ video_id: req.params.id })
        res.json(comments)
    } catch (error) {
        res.json({ message: error })
        console.log('error fetching Comments', error)
    }

}

// add comment 

const addComment = async (req, res) => {

    const { content, authorId, authorName } = req.body

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const createdComment = await Comment.create({
            authorId,
            authorName: authorName ? authorName : 'no author',
            content,
            video_id: req.params.id
        }).catch((err) => {
            res.json({ message: err })
        })
        res.status(201).json(createdComment)
    } else {
        res.status(404).json({ message: 'cannot add comment' })
    }

}




//delete Comment by id
const deleteCommentById = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const foundedComment = await Comment.findById(req.params.id);

        if (foundedComment) {

            await Comment.deleteOne(foundedComment)
            res.json({ message: 'Comment Deleted' })

        } else {
            res.status(404)
            throw new Error('Comment Not Found')
        }
    }
}







export { addComment, getComments, deleteCommentById }