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

export const groupRoutes = router;
