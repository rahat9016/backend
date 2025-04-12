import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

// ? Create Blog

const createBlog = async (payload: IBlog): Promise<IBlog | null> => {
  const result = await Blog.create(payload);
  return result;
};

// ? Get all blogs

const getAllBlogs = async (): Promise<IBlog[] | null> => {
  const result = await Blog.find();
  return result;
};

// ? Get active blogs

const getActiveBlogs = async (): Promise<IBlog[] | null> => {
  const result = await Blog.find({ activeStatus: true });
  return result;
};

// ? Get a single blog

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);
  return result;
};

// ? Update blog

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const isExist = await Blog.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const updatedBlogData = payload;

  const result = await Blog.findOneAndUpdate({ id }, updatedBlogData, {
    new: true,
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getActiveBlogs,
  getSingleBlog,
  updateBlog,
};
