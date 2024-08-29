// routes/ratingRoutes.js
import express from 'express';
import { createRating, getRatingById, updateRating, deleteRating } from '../controllers/ratingController.js';

const router = express.Router();

// Define routes for rating operations
router.post('/', createRating);
router.get('/:id', getRatingById);
router.put('/:id', updateRating);
router.delete('/:id', deleteRating);

export default router;
