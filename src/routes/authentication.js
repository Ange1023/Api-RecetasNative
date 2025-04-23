import express from 'express';
import Auth from '../controllers/authenticacion.js';

const router = express.Router();

router.post('/signup', Auth.signUp);
router.post('/signin', Auth.signIn);
router.post('/signout', Auth.signOut);

export default router;