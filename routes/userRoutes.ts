import express from 'express';
const router = express.Router();
import { addUserCredentials, deleteUserCredentials, getUserCredentials, updateUserCredentials } from '../controllers/userController';
import { verifyToken } from '../middlewares/auth';

router.post('/user-credentials', addUserCredentials)
router.get('/user-credentials/:email', getUserCredentials)
router.patch('/user-credentials/:email/:id', updateUserCredentials)
router.delete('/user-credentials/:email/:id', deleteUserCredentials)

export default router;