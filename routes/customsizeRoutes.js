import express from 'express';
import upload from '../middleware/uploadImage.js';
import { getCustomsize, createCustomsize, deleteCustomsize } from '../controllers/customsizeController.js';

const router = express.Router();

router.get('/customsize', getCustomsize);
router.post('/customsize', upload.single('img'), createCustomsize);
router.delete('/customsize/:id', deleteCustomsize);

export default router;