import mongoose, { Schema } from 'mongoose';
import { ICategory, ICategoryModel } from './group.interface';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory, ICategoryModel>(
  'Category',
  CategorySchema
);
export default Category;
