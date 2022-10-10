import express from 'express';

import { getVideos, getVideoById, createVideo, updateVideo, deleteVideoById, updateLikeCount } from '../controllers/videoController.js';
const router = express.Router();


// video get all data
router.get('/', getVideos)

// video single get one video by id
router.get('/:videoId', getVideoById)

//create video
router.post('/createVideo', createVideo)

//update video
router.put('/:videoId', updateVideo)

// delete video
router.delete('/:videoId', deleteVideoById)

router.patch('/:videoId', updateLikeCount)

export default router;