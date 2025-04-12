import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactController } from './contact.controller';
import { ContactValidation } from './contact.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(ContactValidation.createContactZodSchema),
  ContactController.createContact
);
router.get('/all', ContactController.getContacts);

export const contactRoutes = router;
