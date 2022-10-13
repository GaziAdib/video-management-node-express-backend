import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    author: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;