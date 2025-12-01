import express from 'express';
import {
  getAllCreators,
  getCreatorById,
  createCreator,
  updateCreator,
  deleteCreator
} from '../controllers/creatorsController.js';

const router = express.Router();

router.get('/', getAllCreators);
router.get('/:id', getCreatorById);
router.post('/', createCreator);
router.put('/:id', updateCreator);
router.delete('/:id', deleteCreator);

export default router;
