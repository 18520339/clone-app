import express from 'express';
import { getCards, createCards } from './cards.service.js';

const router = express.Router();
router.get('/cards', getCards);
router.post('/cards', createCards);
export default router;
