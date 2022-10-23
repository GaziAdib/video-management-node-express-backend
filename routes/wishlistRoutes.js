import express from 'express';
import { createWishlist, deleteWishlistById, getAllWishlists, getWishlists } from '../controllers/wishlistController.js';
const router = express.Router();



// wish all data
router.get('/allWishlists', getAllWishlists)


// wish get all data
router.get('/:id/all', getWishlists)


// delete wish
router.delete('/:id', deleteWishlistById)


//create wish
router.post('/create', createWishlist)



export default router;