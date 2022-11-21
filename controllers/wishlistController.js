import mongoose from "mongoose";
import Wishlist from "../models/WishlistModel.js";

// get all Wishlists

const getWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find({ authorId: req.params?.userId });
        res.json(wishlists)
    } catch (error) {
        res.json({ message: error })
        console.log('error fetching wishlists', error)
    }

}

const getAllWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find({});
        res.json(wishlists)
    } catch (error) {
        res.json({ message: error })
        console.log('error fetching wishlists', error)
    }

}

// add Wish list

const createWishlist = async (req, res) => {

    const { video_id, authorName, videoOwnerId, title, category, thumbnailUrl } = req.body

    try {

        const createdWishlist = await Wishlist.create({
            video_id: video_id,
            videoOwnerId: videoOwnerId,
            authorName: authorName,
            title: title,
            category: category,
            thumbnailUrl: thumbnailUrl
        })
        res.status(201).json(createdWishlist)

    } catch (error) {
        res.json({ message: 'Something is wrong while add to wishlist' });
    }

}


//delete Wishlist by id
const deleteWishlistById = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {

        try {
            const foundedWishlist = await Wishlist.findById(req.params.id);
            if (foundedWishlist) {

                await Wishlist.deleteOne(foundedWishlist)
                res.json({ message: 'Wishlist Deleted' })

            } else {
                res.status(404)
                throw new Error('Wishlist Not Found')
            }
        } catch (error) {
            res.json({ message: 'Wishlist cannot be deleted' })
        }




    }
}







export { getWishlists, createWishlist, getAllWishlists, deleteWishlistById }