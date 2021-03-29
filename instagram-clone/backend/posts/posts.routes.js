import express from 'express';
import { getPosts, createPosts } from './posts.service.js';

const router = express.Router();
router.get('/posts', getPosts);
router.post('/posts', createPosts);
export default router;
