import express from 'express';
import { addBlogComment, deleteBlogCommentById, getBlogComments } from '../controllers/blogCommentController.js';

const router = express.Router();

//  get all blog comments for a blog id 
router.get('/:blogId/getComments', getBlogComments)

//add new blog comment
router.post('/:blogId/addBlogComment', addBlogComment)

//delete comment
router.delete('/:blogId/blogComment/delete', deleteBlogCommentById)


export default router;