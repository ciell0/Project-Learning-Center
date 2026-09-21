import { Router } from 'express';
import {
  createApplication,
  getMyApplications,
  getApplicationById
} from '../controllers/applicationController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// User Application Endpoints
router.post('/', authenticate, createApplication);
router.get('/my', authenticate, getMyApplications);
router.get('/:id', authenticate, getApplicationById);

export default router;
