import express from 'express';
import { addComment, deleteCommentById, getComments } from '../controllers/commentController.js';
import loginCheck from '../middlewares/loginCheck.js';
const router = express.Router();

//  get all comments for a video id 
router.get('/:id/comments', getComments)

//add new comment
router.post('/:id/addcomments', loginCheck, addComment)

//delete comment
router.delete('/:id/comment/delete', loginCheck, deleteCommentById)


export default router;