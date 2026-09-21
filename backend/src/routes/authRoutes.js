import { Router } from 'express';
import { login, register, adminLogin, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/admin/login', adminLogin);
router.get('/me', authenticate, getMe);

export default router;
