import { z } from 'zod';


export const createPostSchema = z.object({
    postProductName: z.string(),
    postTitle: z.string(),
    postProductId: z.string(),
    postContent: z.string(),
    postUserId: z.string(),
  });
export type CreatePostData = z.infer<typeof createPostSchema>;