import { Router } from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/property.controller';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', upload.single('image'), createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;
