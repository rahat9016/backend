import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ourServiceController } from './ourService.controller';
import { OurServiceValidation } from './ourService.validation';

const router = express.Router();

router.post(
  '/create-our-service',
  validateRequest(OurServiceValidation.createOurServiceZodSchema),
  ourServiceController.createOurService
);

router.get('/get-our-service', ourServiceController.getOurService);
router.get('/get-active-service', ourServiceController.getActiveService);

export const ourServiceRoutes = router;
