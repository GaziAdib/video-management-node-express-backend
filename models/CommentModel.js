import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    video_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Video'
    },
    author: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;