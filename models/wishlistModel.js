import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    video_id: {
        type: String,
        required: true
    },
    videoOwnerId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    category: {
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