import express from 'express';
import loginCheck from '../middlewares/loginCheck.js';
import { getVideos, getVideoById, createVideo, updateVideo, deleteVideoById, updateLikeCount, searchByTitle, likesVideoByUser, unlikeVideoByUser, getRelatedVideosByCategory, getPaginatedVideos } from '../controllers/videoController.js';
const router = express.Router();


// video get all data
router.get('/', getVideos)

// paginated videos
router.get('/paginatedvideos', getPaginatedVideos);

// video single get one video by id
router.get('/:videoId', getVideoById)

//create video
router.post('/createVideo', createVideo)

//update video
router.put('/:videoId/update', updateVideo)

// delete video
router.delete('/:videoId', deleteVideoById)

router.patch('/:videoId', updateLikeCount)

//search by title
router.get('/search/:title', searchByTitle)

//like
router.patch('/:videoId/likes', loginCheck, likesVideoByUser)

// unlike
router.patch('/:videoId/unlikes', loginCheck, unlikeVideoByUser)






export default router;