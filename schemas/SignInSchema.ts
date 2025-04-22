import { z } from 'zod';


export const signInFormSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
export type SignInData = z.infer<typeof signInFormSchema>;