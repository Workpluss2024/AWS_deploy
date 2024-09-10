import { Router } from 'express';
import { getGenderList, getLanguageList, getDurationList } from '../controllers/staticlistController.js';

const router = Router();

// Define routes for static lists
router.get('/genders', getGenderList);
router.get('/languages', getLanguageList);
router.get('/durations', getDurationList);

export default router;
