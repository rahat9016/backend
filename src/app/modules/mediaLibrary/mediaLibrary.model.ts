import { Schema, model } from 'mongoose';
import { IGalleryLibraryGroup, IGalleryLibraryGroupModel, IMediaGallery, IMediaGalleryModel } from './mediaLibary.interface';

const MediaGalleryLibrarySchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

const GalleryLibrarySchema: Schema = new Schema(
  {
    images: [
      {
        imgId: {
          type: Schema.Types.ObjectId,
          ref: 'MediaLibrary',
          required: true
        },
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
        },
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

export const GalleryLibrary = model<IGalleryLibraryGroup, IGalleryLibraryGroupModel>(
  'GalleryLibrary',
  GalleryLibrarySchema
);


export const MediaGalleryLibrary = model<IMediaGallery, IMediaGalleryModel>(
  'MediaLibrary',
  MediaGalleryLibrarySchema
);
