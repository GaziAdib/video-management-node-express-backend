import mongoose from "mongoose";
import Wishlist from "../models/WishlistModel.js";

// get all Wishlists

const getWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find({ authorId: req.params.id });
        res.json(wishlists)
    } catch (error) {
        res.json({ message: error })
        console.log('error fetching wishlists', error)
    }

}

// add Wish list

const createWishlist = async (req, res) => {

    const { title, authorId, authorName, category, thumbnailUrl } = req.body

    const createdWishlist = await Wishlist.create({
        authorId: authorId,
        authorName: authorName,
        title: title,
        category: category,
        thumbnailUrl: thumbnailUrl
    })

    res.status(201).json(createdWishlist)

}




//delete Wishlist by id
const deleteWishlistById = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const foundedWishlist = await Wishlist.findById(req.params.id);

        if (foundedWishlist) {

            await Wishlist.deleteOne(foundedWishlist)
            res.json({ message: 'Wishlist Deleted' })

        } else {
            res.status(404)
            throw new Error('Wishlist Not Found')
        }
    }
}







export { getWishlists, createWishlist, deleteWishlistById }