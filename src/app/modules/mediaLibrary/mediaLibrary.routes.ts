import express from 'express';
import { upload } from '../../util/multerConfig';
import { MediaLibraryController } from './mediaLibrary.controller';
import { mediaLibraryValidation } from './mediaLibray.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/gallery',
  upload.array('gallery'),
  MediaLibraryController.uploadGalleryMedia
);
router.get('/gallery', MediaLibraryController.getGalleryMedia);
router.delete('/gallery', MediaLibraryController.deleteAllImages);

router.post(
  '/upload-images-from-gallery',
  validateRequest(mediaLibraryValidation.galleryLibraryFormSchema),
  MediaLibraryController.uploadImagesFromGallery
);
router.get(
  '/get-images-from-gallery',
  MediaLibraryController.getImagesFromGallery
);
export const MediaLibraryRoutes = router;
