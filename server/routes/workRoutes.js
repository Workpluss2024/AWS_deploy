import { Router } from 'express';
const router = Router();

import {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
} from '../controllers/workController.js';

// Routes for work posts
router.post('/', createWork);            // Create a new job post
router.get('/', getAllWorks);            // Get all job posts
router.get('/:id', getWorkById);         // Get a job post by ID
router.put('/:id', updateWork);          // Update a job post by ID
router.delete('/:id', deleteWork);       // Delete a job post by ID

export default router;
