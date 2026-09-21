import { Router } from 'express';
import {
  getAllApplications,
  getApplicationDetail,
  updateApplicationStatus,
  assignDivision,
  getAdminMalabarPrograms,
  createMalabarProgram,
  updateMalabarProgram,
  deleteMalabarProgram
} from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes
router.use(authenticate, requireAdmin);

// Internship Applications Management
router.get('/internship-applications', getAllApplications);
router.get('/internship-applications/:id', getApplicationDetail);
router.patch('/internship-applications/:id/status', updateApplicationStatus);
router.patch('/internship-applications/:id/division', assignDivision);

// Malabar Programs Management
router.get('/internships/malabar', getAdminMalabarPrograms);
router.post('/internships/malabar', createMalabarProgram);
router.patch('/internships/malabar/:id', updateMalabarProgram);
router.delete('/internships/malabar/:id', deleteMalabarProgram);

export default router;
