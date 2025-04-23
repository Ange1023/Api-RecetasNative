import express from 'express';
import User from '../controllers/User.js';
import { verifyToken } from '../controllers/authenticacion.js';

const router = express.Router();

router.get('/', User.getUserById);
router.get('/all', User.getAllUsers);
router.post('/', User.createUser);
router.put('/:id', verifyToken, User.updateUser);
router.delete('/:id', User.deleteUser);

export default router;