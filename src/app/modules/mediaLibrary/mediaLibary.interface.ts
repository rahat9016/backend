import { Document, Model, Types } from 'mongoose';

export type IMediaGallery = {
  _id?: string;
  filename: string;
  image: string;
  fileType: 'image' | 'video' | 'other';
  createdAt?: Date;
  updatedAt?: Date;
};

export type IGalleryLibraryGroup = {
  images: {
    imgId: Types.ObjectId;
    title: string;
    description?: string;
  }[];
  categoryIds: Types.ObjectId;
} & Document


export type IMediaGalleryModel = Model<IMediaGallery, Record<string, unknown>>;
export type IGalleryLibraryGroupModel = Model<IGalleryLibraryGroup, Record<string, unknown>>;

export type PaginationMediaGallery = {
  data: IMediaGallery[];
  total: number;
};
export type PaginationGalleryLibraryGroup = {
  data: IGalleryLibraryGroup[];
  total: number;
};