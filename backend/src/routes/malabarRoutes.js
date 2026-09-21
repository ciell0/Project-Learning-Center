import { Router } from 'express';
import { getPublicMalabarPrograms } from '../controllers/malabarController.js';

const router = Router();

// Public Malabar Endpoint for Frontend User
router.get('/malabar', getPublicMalabarPrograms);

export default router;
