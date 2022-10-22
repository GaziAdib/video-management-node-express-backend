import express from 'express';
import loginCheck from '../middlewares/loginCheck.js';
import { getVideos, getVideoById, createVideo, updateVideo, deleteVideoById, updateLikeCount, searchByTitle, likesVideoByUser, unlikeVideoByUser } from '../controllers/videoController.js';
const router = express.Router();


// video get all data
router.get('/', getVideos)

// video single get one video by id
router.get('/:videoId', getVideoById)

//create video
router.post('/createVideo', loginCheck, createVideo)

//update video
router.put('/:videoId', loginCheck, updateVideo)

// delete video
router.delete('/:videoId', loginCheck, deleteVideoById)

router.patch('/:videoId', updateLikeCount)

//search by title
router.get('/search/:title', searchByTitle)

//like
router.patch('/:videoId/likes', loginCheck, likesVideoByUser)

// unlike
router.patch('/:videoId/unlikes', loginCheck, unlikeVideoByUser)






export default router;