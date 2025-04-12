import express from 'express';
import { upload } from '../../util/multerConfig';
import { careerController } from './career.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CareerValidation } from './career.validation';

const router = express.Router();
router.post(
  '/create',
  upload.array('resume', 10),
  validateRequest(CareerValidation.createCareerZodSchema),
  careerController.createCareer
);

router.get('/all', careerController.getCareers);

export const careerRoutes = router;
