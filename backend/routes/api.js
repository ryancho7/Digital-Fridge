import express from 'express';
import foodItemsRouter from './foodItems.js';
import fridgesRouter from './fridges.js';
import usersRouter from './users.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.use('/users', usersRouter);

// Protected routes
router.use('/fridges', authMiddleware, fridgesRouter);
router.use('/foodItems', authMiddleware, foodItemsRouter);

export default router;