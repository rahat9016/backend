import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdmissionRoutes } from '../modules/admissions/admission.routes';
import { MediaLibraryRoutes } from '../modules/mediaLibrary/mediaLibrary.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path:'/auth',
    route: AuthRoutes
  },
  {
    path:'/student',
    route: AdmissionRoutes
  },
  {
    path: '/media-library',
    route: MediaLibraryRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
