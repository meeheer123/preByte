import express from 'express';
import { apply } from '../controllers/application.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/apply', verifyToken, apply);

export default router;
