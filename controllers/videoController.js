import Video from "../models/VideoModel.js";

// get all videos

const getVideos = async (req, res) => {
    const videos = await Video.find({});
    res.json(videos)
}

// get video by id
const getVideoById = async (req, res) => {
    const video = await Video.findById(req.params.videoId);

    if(video) {
        res.json(video)
    } else {
        res.status(404).json({ message: 'video with this id not found!'})
        throw new Error('Video Not Found')
    }
}


// add video

const createVideo = async (req, res) => {

    const { title, category, description, thumbnailUrl, videoUrl } = req.body

    const createdVideo = await Video.create({
        author: 'Adib',
        title: title,
        category: category,
        description: description,
        thumbnailUrl: thumbnailUrl,
        videoUrl: videoUrl,
        likeCount: 0,
        unlikeCount: 0
    })

    res.status(201).json(createdVideo)

}


// Update a video info
const updateVideo = async (req, res) => {

    const {title, category, description, thumbnailUrl, videoUrl } = req.body

    const video = await Video.findById(req.params.videoId);

    if(video) {
        video.title = title
        video.category = category
        video.description = description
        video.thumbnailUrl = thumbnailUrl
        video.videoUrl = videoUrl

        const updateVideo = await video.save()

        res.json(updateVideo);
    }
     else {
        res.status(404)
        throw new Error('Video Not Found')
    }
       
}

// delete video by id
const deleteVideoById = async (req, res) => {
    const foundedVideo =  await Video.findById(req.params.videoId);

    if(foundedVideo) {

     await Video.deleteOne(foundedVideo)
     res.json({ message: 'Video Deleted' })
        
    } else {
        res.status(404)
        throw new Error('Video Not Found')
    }
    
}
export { getVideos, getVideoById, createVideo, updateVideo, deleteVideoById }