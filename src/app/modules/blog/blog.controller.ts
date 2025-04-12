import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { IBlog } from './blog.interface';
import { BlogService } from './blog.service';

// ? Create Blog

const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;
  const result = await BlogService.createBlog(blogData);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully!',
    data: result,
  });
});

// ? Get all blogs

const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs();

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved successfully!',
    data: result,
  });
});

// ? Get all blogs

const getActiveBlogs = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.getActiveBlogs();

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved successfully!',
    data: result,
  });
});

// ? Get a single blog

const getSingleBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BlogService.getSingleBlog(id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully!',
    data: result,
  });
});

// ? Update blog

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BlogService.updateBlog(id, updatedData);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getBlogs,
  getActiveBlogs,
  getSingleBlog,
  updateBlog,
};
