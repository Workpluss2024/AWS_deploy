// routes/feedbackRoutes.js
import express from 'express';
import { createFeedback, getFeedbackById, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// Define routes for feedback operations
router.post('/', createFeedback);
router.get('/:id', getFeedbackById);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

export default router;
