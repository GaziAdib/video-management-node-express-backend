import express from 'express';
import { changePassword, createNewUser, forgotPassword, loginUser, sendEmailLink } from '../controllers/userController.js';
const router = express.Router();


// register new user
router.post('/register', createNewUser)

// login user
router.post('/login', loginUser)


// send password link
router.post('/sendpasswordlink', sendEmailLink);

router.get('/forgotpassword/:id/:token', forgotPassword);

router.post('/changepassword/:id/:token', changePassword);






export default router;