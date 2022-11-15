import mongoose from "mongoose";
import BlogComment from "../models/blogCommentModel.js";



// get all Comments

const getBlogComments = async (req, res) => {
    try {
        const comments = await BlogComment.find({ blog_id: req.params.blogId })
        res.json(comments)
    } catch (error) {
        res.json({ message: error })
        console.log('error fetching Comments', error)
    }

}

// add comment 

const addBlogComment = async (req, res) => {

    const { blogAuthorName, blogCommentContent, blog_author_id } = req.body

    const { blogId } = req.params.blogId;

    if (mongoose.Types.ObjectId.isValid(blogId)) {
        if (blogAuthorName !== '') {
            const createdComment = await BlogComment.create({
                blog_author_id,
                blogAuthorName,
                blogCommentContent,
                blog_id: blogId
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
const deleteBlogCommentById = async (req, res) => {

    const { blogId } = req.params.blogId;

    if (mongoose.Types.ObjectId.isValid(blogId)) {

        try {
            const foundedComment = await BlogComment.findById(blogId);

            if (foundedComment) {
                try {
                    await BlogComment.deleteOne(foundedComment)
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







export { getBlogComments, addBlogComment, deleteBlogCommentById }