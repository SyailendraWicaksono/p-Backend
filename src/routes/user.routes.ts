import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { registerSchema, updateUserSchema } from '../validations/user.validation';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// ⬇️ route /me HARUS di atas /:id
router.get('/me', authenticateToken, getMe);

// List users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUserById);

// Create user dengan validasi
router.post('/', validate(registerSchema), createUser);

// Update user dengan validasi
router.put('/:id', validate(updateUserSchema), updateUser);

// Delete user
router.delete('/:id', deleteUser);

export default router;
