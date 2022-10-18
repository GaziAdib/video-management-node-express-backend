import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    video_id: {
        type: String,
        ref: 'Video'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    authorName: {
        type: String,
        required: true,
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