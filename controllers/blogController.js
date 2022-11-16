import mongoose from "mongoose";
import Blog from "../models/blogModel.js"


// get blogs 


const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Blogs From Server', error: error });
    }
}


// getBlogById

const getBlogById = async (req, res) => {

    const blogId = req.params?.blogId;

    try {

        if (mongoose.Types.ObjectId.isValid(blogId)) {

            if (blogId) {
                const blog = await Blog.findById(blogId);
                res.json(blog);
            } else {
                res.status(404).json({ message: 'Blog With Given Id not found!' })
            }

        } else {
            throw new Error('blog is not valid')
        }


    } catch (error) {
        res.json({ message: error })
    }
}


const createBlog = async (req, res) => {

    const { blogAuthorId, blogAuthor, blogTitle, blogCategory, blogDescription } = req.body

    try {
        const createdBlog = await Blog.create({
            blogAuthorId,
            blogAuthor,
            blogTitle,
            blogCategory,
            blogDescription
        })

        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(404).json({ message: error })
    }

}


//delete blog by id
const deleteBlogById = async (req, res) => {
    const { blogId } = req.params;

    if (mongoose.Types.ObjectId.isValid(blogId)) {
        try {
            const foundedBlog = await Blog.findById(blogId);

            if (foundedBlog) {

                await Blog.deleteOne(foundedBlog);
                res.json({ message: 'Blog Deleted' })

            } else {
                res.status(404).json({ message: 'Blog not found' });
                throw new Error('Blog Not Found')
            }

        } catch (error) {
            res.json({ message: error });
        }

    }

}



// update blogs by Id 
const UpdateBlogById = async (req, res) => {

    const blogId = req.params?.blogId;

    const { blogTitle, blogCategory, blogDescription, blogIsPublished } = req.body

    if (mongoose.Types.ObjectId.isValid(blogId)) {
        try {
            if (blogId) {
                const blogUpdated = await Blog.findByIdAndUpdate(blogId, { $set: { blogTitle: blogTitle, blogCategory: blogCategory, blogDescription: blogDescription, blogIsPublished: blogIsPublished } });
                res.status(201).json(blogUpdated);

            } else {
                res.status(404).json({ message: 'blog not found with this id' })
            }

        } catch (error) {
            res.status(401).json({ message: error })
        }
    }
}


// search 
const searchBlogByTitle = async (req, res) => {

    //Product.find({title: { $regex: title, $options: "i" }})
    // const queryTitle = new RegExp(req.params?.title, 'i');

    // const queryTitle = req.params?.title;
    // console.log(queryTitle);
    // console.log(req.params?.title);


    if (req?.params?.title) {
        try {
            const search_results = await Blog.find({ blogTitle: { $regex: req?.params?.title, $options: "i" } })
            res.status(200).json(search_results)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: 'No Results found on blogs' })
        }

    } else {
        res.status(404)
        throw new Error('Not Found based on this title')
    }

}



export { getBlogs, getBlogById, createBlog, deleteBlogById, UpdateBlogById, searchBlogByTitle };