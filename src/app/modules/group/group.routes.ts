import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './group.controller';
import { groupValidation } from './group.validation';

const router = express.Router();

router.post(
  '/category',
  validateRequest(groupValidation.categoryFormSchema),
  CategoryController.categoryCreate
);
router.put(
  '/category/:id',
  validateRequest(groupValidation.categoryFormSchema),
  CategoryController.categoryUpdate
);
router.get(
  '/category',
  CategoryController.categoryList
);
router.delete(
  '/category/:id',
  CategoryController.categoryDelete
);
router.get(
  '/category/:id',
  CategoryController.categoryGetById
);
export const groupRoutes = router;
