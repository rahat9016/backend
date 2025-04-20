import { Model } from 'mongoose';

export type IMediaGallery = {
  _id?: string;
  filename: string;
  image: string;
  fileType: 'image' | 'video' | 'other';
  createdAt?: Date;
  updatedAt?: Date;
};


export type IMediaGalleryModel = Model<IMediaGallery, Record<string, unknown>>;

export type PaginationMediaGallery = {
  data: IMediaGallery[];
  total: number;
};