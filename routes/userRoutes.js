import express from 'express';
import { createNewUser, forgetPassword, loginUser, resetPassword } from '../controllers/userController.js';
const router = express.Router();


// register new user
router.post('/register', createNewUser)

// login user
router.post('/login', loginUser)

// forget password

router.post('/forget-password', forgetPassword)


// reset password

router.get('/reset-password/:id/:token', resetPassword)




export default router;