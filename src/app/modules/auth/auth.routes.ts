import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import authenticate from '../../middlewares/authMiddleware';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidation.createUserZodSchema),
  AuthController.signupUser
);
router.post(
  '/signing',
  validateRequest(authValidation.signingUserZodSchema),
  AuthController.signingUser
);
router.post(
  '/refresh-token',
  validateRequest(authValidation.tokenZodSchema),
  AuthController.refreshToken
);
router.get(
  '/user-list',
  authenticate,
  AuthController.userList
);
router.get(
  '/user/:id',
  authenticate,
  AuthController.getUserById
);
router.post('/upload-information', AuthController.sentEmail)
export const AuthRoutes = router;
