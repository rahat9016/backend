import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/create-blog',
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogController.createBlog
);

router.get('/', BlogController.getBlogs);
router.get('/:id', BlogController.getSingleBlog);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogController.updateBlog
);

export const BlogRoutes = router;
