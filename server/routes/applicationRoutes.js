// routes/applicationRoutes.js
import express from 'express';
import { createApplication, getApplicationById, updateApplication, deleteApplication } from '../controllers/applicationController.js';

const router = express.Router();

// Define routes for application operations
router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

export default router;
