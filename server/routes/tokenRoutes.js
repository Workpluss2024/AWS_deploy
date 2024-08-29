// routes/tokenRoutes.js
import express from 'express';
import { createToken, getTokenById, updateToken, deleteToken } from '../controllers/tokenController.js';

const router = express.Router();

// Define routes for token operations
router.post('/', createToken);
router.get('/:id', getTokenById);
router.put('/:id', updateToken);
router.delete('/:id', deleteToken);

export default router;
