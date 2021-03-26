import express from 'express';
import { getMessages, createMessages } from './messages.service.js';

const router = express.Router();
router.get('/messages', getMessages);
router.post('/messages', createMessages);
export default router;
