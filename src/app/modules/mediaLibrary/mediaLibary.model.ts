import { Schema, model } from 'mongoose';
const MediaGalleryLibrarySchema: Schema = new Schema({
  filename: { type: String, required: true },
  image: { type: String, required: true },
  fileType: {
    type: String,
    enum: ['image', 'video', 'other'],
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },


});
export const MediaGalleryLibrary = model('MediaLibrary', MediaGalleryLibrarySchema);
