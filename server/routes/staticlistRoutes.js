import { Router } from 'express';
import { getGenderList, getLanguageList } from '../controllers/staticlistController.js';

const router = Router();

// Define routes for static lists
router.get('/genders', getGenderList);
router.get('/languages', getLanguageList);

export default router;
