import express from 'express';
import { upload } from '../../util/multerConfig';
import { MediaLibraryController } from './mediaLibrary.controller';

const router = express.Router();

router.post(
  '/gallery',
  upload.single('gallery'),
  MediaLibraryController.uploadGalleryMedia
);
router.get('/gallery', MediaLibraryController.getGalleryMedia)
export const MediaLibraryRoutes = router;
