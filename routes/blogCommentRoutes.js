import express from 'express';
import { addBlogComment, deleteBlogCommentById, getBlogComments } from '../controllers/blogCommentController.js';

const router = express.Router();

//  get all blog comments for a blog id 
router.get('/:id/getComments', getBlogComments)

//add new blog comment
router.post('/:id/addBlogComment', addBlogComment)

//delete comment
router.delete('/:id/blogComment/delete', deleteBlogCommentById)


export default router;