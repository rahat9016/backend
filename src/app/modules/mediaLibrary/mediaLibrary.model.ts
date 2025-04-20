import { Schema, model } from 'mongoose';
import { IMediaGallery, IMediaGalleryModel } from './mediaLibary.interface';

const MediaGalleryLibrarySchema: Schema = new Schema({
  filename: { type: String, required: true },
  image: { type: String, required: true },
  fileType: {
    type: String,
    enum: ['image', 'video', 'other'],
    default: 'image',
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },

});
export const MediaGalleryLibrary = model<IMediaGallery, IMediaGalleryModel>('MediaLibrary', MediaGalleryLibrarySchema);
