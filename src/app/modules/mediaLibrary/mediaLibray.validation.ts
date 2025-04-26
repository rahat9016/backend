import { z } from 'zod';

const imageItemSchema = z.object({
  imgId: z.string().min(1, 'Image ID is required'),
  title: z.string({ required_error: 'Title is required' }),
  description: z.string().optional(),
});
const galleryLibraryFormSchema = z.object({
  body: z.object({
    images: z
      .array(imageItemSchema)
      .nonempty('At least one image ID is required'),
    categoryId: z.string({ required_error: 'Category id is required' }),
  }),
});

export const mediaLibraryValidation = {
  galleryLibraryFormSchema,
};
