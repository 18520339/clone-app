import express from 'express';
import { getVideos, createVideos } from './videos.service.js';

const router = express.Router();
router.get('/videos', getVideos);
router.post('/videos', createVideos);
export default router;
