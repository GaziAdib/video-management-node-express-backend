import express from 'express';
import { createBlog, deleteBlogById, getBlogById, getBlogs, searchBlogByTitle, UpdateBlogById } from "../controllers/blogController.js"
const router = express.Router();

// get all blogs
router.get('/', getBlogs)

// get single blog by id
router.get('/:blogId', getBlogById)

//create video
router.post('/createBlog', createBlog)

//update video
router.put('/:blogId/update', UpdateBlogById)

// delete video
router.delete('/:blogId/delete', deleteBlogById)

//search by title
router.get('/search/:title', searchBlogByTitle)

export default router;
