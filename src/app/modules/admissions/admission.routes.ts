import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { admissionValidation } from './admission.validation';
import { AdmissionController } from './admission.controller';

const router = express.Router();

router.post(
  '/admission',
  validateRequest(admissionValidation.admissionFormSchema),
  AdmissionController.studentAdmission
);
router.get(
  '/admission-list',
  AdmissionController.studentAdmissionList
);

router.post(
  '/online-appointment',
  validateRequest(admissionValidation.onlineAppointmentZodSchema),
  AdmissionController.onlineAppointment
);

router.post(
  '/school-tour-booking',
  validateRequest(admissionValidation.schoolTourBookingZodSchema),
  AdmissionController.schoolTourBooking
);

export const AdmissionRoutes = router;
