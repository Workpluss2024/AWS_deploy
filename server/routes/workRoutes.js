import { Router } from 'express';
const router = Router();
import { createWork, getWork, updateWork, deleteWork } from '../controllers/workController.js';

router.post('/', createWork);
router.get('/:id', getWork);
router.put('/:id', updateWork);
router.delete('/:id', deleteWork);

export default router;
