// auth.js
import express from 'express';
import { loginUser } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/', loginUser);

export default router;
