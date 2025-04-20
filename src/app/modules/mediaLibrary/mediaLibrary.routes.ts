import express from 'express';
import { upload } from '../../util/multerConfig';
import { MediaLibraryController } from './mediaLibrary.controller';

const router = express.Router();

router.post(
  '/gallery',
  upload.array('gallery'),
  MediaLibraryController.uploadGalleryMedia
);
router.get('/gallery', MediaLibraryController.getGalleryMedia);
router.delete('/gallery', MediaLibraryController.deleteAllImages);

router.post('/upload-images-from-gallery', MediaLibraryController.uploadImagesFromGallery)

export const MediaLibraryRoutes = router;
