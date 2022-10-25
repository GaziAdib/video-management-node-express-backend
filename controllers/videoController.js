import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Video from "../models/VideoModel.js";


// get all videos

const getVideos = async (req, res) => {
    const videos = await Video.find({});
    res.json(videos)
}

// get video by id
const getVideoById = async (req, res) => {

    if (mongoose.Types.ObjectId.isValid(req.params.videoId)) {
        const video = await Video.findByIdAndUpdate(req.params.videoId, { $inc: { viewsCount: 1 } });

        if (video) {
            res.json(video)
        } else {
            res.status(404).json({ message: 'video with this id not found!' })
            throw new Error('Video Not Found')
        }
    }


}


// add video

const createVideo = async (req, res, next) => {

    const { title, authorId, category, description, thumbnailUrl, videoUrl } = req.body

    try {
        const createdVideo = await Video.create({
            authorId: authorId,
            title: title,
            category: category,
            description: description,
            thumbnailUrl: thumbnailUrl,
            videoUrl: videoUrl,
            likeCount: 0,
            unlikeCount: 0
        })

        res.status(201).json(createdVideo)
    } catch (error) {
        res.status(404).json({ message: error })
    }


}


// Update a video info
const updateVideo = async (req, res, next) => {

    const { title, category, description, thumbnailUrl, videoUrl } = req.body

    if (mongoose.Types.ObjectId.isValid(req.params.videoId)) {

        try {
            const videoUpdated = await Video.findByIdAndUpdate(req.params.videoId, {
                $set: { title: title, category: category, description: description, thumbnailUrl: thumbnailUrl, videoUrl: videoUrl }
            });
            res.status(201).json(videoUpdated)
        } catch (error) {
            res.json({ message: error })
        }

    }
}


//delete video by id
const deleteVideoById = async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.videoId)) {

        try {
            const foundedVideo = await Video.findById(req.params.videoId);

            if (foundedVideo) {

                await Video.deleteOne(foundedVideo)
                res.json({ message: 'Video Deleted' })

            } else {
                res.status(404)
                throw new Error('Video Not Found')
            }

        } catch (error) {
            res.json({ message: error });
        }


    }


}

// update like count
const updateLikeCount = async (req, res, next) => {

    if (mongoose.Types.ObjectId.isValid(req.params.videoId)) {
        const videoId = await Video.findById(req.params.videoId);

        if (videoId) {
            const updatedLikeCount = await Video.findByIdAndUpdate(videoId, { $set: { likeCount: 1 } })
            res.json({ updatedLikeCount, message: 'like Count Increased' })
        } else {
            res.status(404)
            throw new Error('Not Found any video to like count')
        }
    }

}

// search 
const searchByTitle = async (req, res) => {
    const queryTitle = new RegExp(req.params.title, 'i');
    if (queryTitle !== '') {
        try {
            const search_results = await Video.find({ title: queryTitle })
            res.status(200).json(search_results)
        } catch (error) {
            console.log(error)
        }

    } else {
        res.status(404)
        throw new Error('Not Found based on this title')
    }

}


// like
const likesVideoByUser = async (req, res, next) => {

    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    const videoLikes = video.likes;

    if (videoLikes.includes(req.user?._id)) {
        res.json({ message: 'You already liked this video!' })
    } else {
        try {
            const result = await Video.findOneAndUpdate({ _id: videoId }, {

                $push: { likes: req?.user?._id },

            })

            return res.json(result);

        } catch (error) {
            console.log(error)
            return res.json({ error: error });
        }
    }




}


// unlike
const unlikeVideoByUser = async (req, res, next) => {
    const { videoId } = req.params;

    try {
        const result = await Video.findOneAndUpdate({ _id: videoId }, {
            $pull: { likes: req?.user?._id },
        }, {
            new: true
        })

        return res.json(result);

    } catch (error) {
        return res.json({ error: error });
    }

}


// get related videos

const getRelatedVideosByCategory = async (req, res) => {
    const queryCategory = new RegExp(req.query.category, 'i');
    if (queryCategory !== '') {
        try {
            const results = await Video.find({ category: queryCategory })
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error })
        }

    } else {
        res.status(404).json({ message: 'Not Found related videos based on this category' })
        throw new Error('Not Found based on this category')
    }

}






export { getVideos, getVideoById, createVideo, updateVideo, deleteVideoById, updateLikeCount, searchByTitle, likesVideoByUser, unlikeVideoByUser, getRelatedVideosByCategory }