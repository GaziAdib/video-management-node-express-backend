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

    const { content, authorName, authorId } = req.body

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        if (authorName !== '') {
            const createdComment = await Comment.create({
                authorId,
                authorName,
                content,
                video_id: req.params.id
            })
            res.status(201).json(createdComment)
        } else {
            res.status(403).json({ message: 'You have to sign in to comment' })
        }

    } else {
        res.status(404).json({ message: 'id is not valid' })
    }

}




//delete Comment by id
const deleteCommentById = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {

        try {
            const foundedComment = await Comment.findById(req.params.id);
            if (foundedComment) {
                try {
                    await Comment.deleteOne(foundedComment)
                    res.json({ message: 'Comment Deleted' })
                } catch (error) {
                    res.json({ message: error })
                }
            }
        } catch (error) {
            res.status(404).json({ message: 'Comment not found' })
        }

    }
}







export { addComment, getComments, deleteCommentById }