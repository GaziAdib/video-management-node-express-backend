import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({

    blogAuthorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    blogAuthor: {
        type: String,
        required: true
    },

    blogTitle: {
        type: String,
        required: true
    },

    blogCategory: {
        type: String,
        required: true
    },

    blogDescription: {
        type: String,
        required: true,
    },

    blogIsPublished: {
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;