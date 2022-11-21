import express from 'express';
import { getUserProfileById, updateUserProfileById } from '../controllers/userProfileController.js';
const router = express.Router();

// get all blogs
router.get('/:userId', getUserProfileById);
router.put('/:userId/update', updateUserProfileById);


export default router;
