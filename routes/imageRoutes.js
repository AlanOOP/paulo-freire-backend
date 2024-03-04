import express from 'express';
import {
    getImagesActivities,
    createImageActivity
} from '../controllers/imageController.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router();

router.get('/images', getImagesActivities);
router.post('/images', upload.single('image'), createImageActivity);

export default router;