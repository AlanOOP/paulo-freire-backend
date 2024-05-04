import express from 'express';
import {
    getUsers,
    getUserById,
    addUser,
    login
} from '../controllers/userController.js'

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', addUser);
router.post('/login', login);

export default router;
