import { Router } from 'express';
const router = Router();

import { createUser, getUser, updateUser, deleteUser, loginUser, getAllUsers } from '../controllers/userController.js';

router.post('/', createUser);
router.post('/login', loginUser); 
router.get('/:id', getUser);
router.get('/', getAllUsers); 
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
