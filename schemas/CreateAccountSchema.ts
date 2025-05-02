import { z } from 'zod';


export const createAccountFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    phone_number: z.string().optional(),
    confirmationCode: z.string().optional(),
    userName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    profilePictureUri: z.string().optional(),

  });
export type CreateAccountData = z.infer<typeof createAccountFormSchema>;