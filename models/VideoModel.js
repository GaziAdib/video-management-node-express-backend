import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    videoSourceType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    likeCount: {
        type: Number,
        default: 0
    },
    unlikeCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);
export default Video;