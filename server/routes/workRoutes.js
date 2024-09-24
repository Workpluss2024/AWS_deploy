import express from 'express';
import {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
} from '../controllers/workController.js';

const router = express.Router();

router.post('/work', createWork);
router.get('/work', getAllWorks);
router.get('/work/:id', getWorkById);
router.put('/work/:id', updateWork);
router.delete('/work/:id', deleteWork);

export default router;
