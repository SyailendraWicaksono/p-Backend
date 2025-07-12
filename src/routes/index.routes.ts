// src/routes/index.ts
import { Router } from 'express';
import adminRoutes from './admin.routes';
import projectIdeaRoutes from './projectIdea.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the API root!');
});

router.use('/admins', adminRoutes); // ✅ tambahkan admin routes
router.use('/project-ideas', projectIdeaRoutes);

export default router;
