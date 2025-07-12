import express from 'express';
import {
  getProjectIdeas,
  getProjectIdeaById,
  createProjectIdea,
  updateProjectIdea,
  deleteProjectIdea
} from '../controllers/projectIdea.controller';
import { validate } from '../middlewares/validate';
import {
  createProjectIdeaSchema,
  updateProjectIdeaSchema
} from '../validations/projectIdea.validation';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', getProjectIdeas);
router.get('/:id', getProjectIdeaById);
router.post('/', createProjectIdea);
router.put('/:id', updateProjectIdea);
router.delete('/:id', deleteProjectIdea);
router.post('/', validate(createProjectIdeaSchema), createProjectIdea);
router.put('/:id', validate(updateProjectIdeaSchema), updateProjectIdea);
router.post('/', authenticateToken, validate(createProjectIdeaSchema), createProjectIdea);
router.put('/:id', authenticateToken, validate(updateProjectIdeaSchema), updateProjectIdea);
router.delete('/:id', authenticateToken, deleteProjectIdea);

export default router;