import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CircularValidation } from './circular.validation';
import { CircularController } from './circular.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(CircularValidation.createCircularZodSchema),
  CircularController.createCircular
);
router.get('/all', CircularController.getAllCircular);
router.get('/:id', CircularController.getSingleCircular);
router.get('/all/client', CircularController.getAllClientCircular);
router.patch('/update/:id', CircularController.updateCircular);

export const circularRoutes = router;
