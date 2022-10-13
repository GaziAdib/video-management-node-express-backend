import express from 'express';
import { createWishlist, deleteWishlistById, getWishlists } from '../controllers/wishlistController.js';


const router = express.Router();


// wish get all data
router.get('/', getWishlists)

//create wish
router.post('/', createWishlist)

// delete wish
router.delete('/:id', deleteWishlistById)


export default router;