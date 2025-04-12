import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { tecTalentsController } from './tecTalents.controller';
import { TecTalentsValidation } from './tecTalents.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(TecTalentsValidation.createTecTalentsZodSchema),
  tecTalentsController.createTecTalents
);

export const tecTalentsRoutes = router;
