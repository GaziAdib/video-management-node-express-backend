import express from 'express';
import { createNewUser, loginUser } from '../controllers/userController.js';
const router = express.Router();


// register new user
router.post('/register', createNewUser)

// login user
router.post('/login', loginUser)




export default router;