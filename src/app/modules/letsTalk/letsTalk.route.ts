import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LetsTalkController } from './letsTalk.controller';
import { TalkFormValidation } from './letsTalk.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(TalkFormValidation.createTalkFormZodSchema),
  LetsTalkController.createLetsTalk
);

export const letsTalkRoutes = router;
