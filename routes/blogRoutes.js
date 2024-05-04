import express from 'express';
import upload from '../middleware/uploadImage.js';
import {
    getBlog,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blogController.js';

const router = express.Router();

router.get('/blog', getBlog);
router.get('/blog/:id', getBlogById);
router.post('/blog', upload.single('img'), createBlog);
router.put('/blog/:id', upload.single('img'), updateBlog);
router.delete('/blog/:id', deleteBlog);

export default router;