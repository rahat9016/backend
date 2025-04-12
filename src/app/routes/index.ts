import express from 'express';
import { careerRoutes } from '../modules/career/career.route';
import { contactRoutes } from '../modules/contact/contact.route';
import { circularRoutes } from '../modules/jobcircular/circular.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdmissionRoutes } from '../modules/admissions/admission.routes';

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
  // {
  //   path: '/our-service',
  //   route: ourServiceRoutes,
  // },
  {
    path: '/career',
    route: careerRoutes,
  },
  // {
  //   path: '/tecTalents',
  //   route: tecTalentsRoutes,
  // },
  // {
  //   path: '/blog',
  //   route: BlogRoutes,
  // },
  // {
  //   path: '/lets-talk',
  //   route: letsTalkRoutes,
  // },
  {
    path: '/contact',
    route: contactRoutes,
  },
  {
    path: '/circular',
    route: circularRoutes,
  },
  // {
  //   path: '/project-category',
  //   route: CategoryRoutes,
  // },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
