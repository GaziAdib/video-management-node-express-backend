import mongoose from 'mongoose';

const blogCommentSchema = new mongoose.Schema({
    blog_id: {
        type: String,
        ref: 'Blog',
        required: true,
    },
    blog_author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blogAuthorName: {
        type: String,
        required: true,
    },
    blogCommentContent: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const BlogComment = mongoose.model('BlogComment', blogCommentSchema);
export default BlogComment;