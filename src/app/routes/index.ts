import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdmissionRoutes } from '../modules/admissions/admission.routes';
import { MediaLibraryRoutes } from '../modules/mediaLibrary/mediaLibrary.routes';
import { groupRoutes } from '../modules/group/group.routes';

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
  {
    path: '/group',
    route: groupRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
