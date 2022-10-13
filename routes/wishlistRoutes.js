import express from 'express';
import { createWishlist, deleteWishlistById, getWishlists } from '../controllers/wishlistController.js';
const router = express.Router();



// wish get all data
router.get('/all', getWishlists)


// delete wish
router.delete('/:id', deleteWishlistById)


//create wish
router.post('/create', createWishlist)



export default router;