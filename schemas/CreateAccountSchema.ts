import { z } from 'zod';


export const createAccountFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    phone_number: z.string().optional(),
    confirmationCode: z.string().optional(),

  });
export type CreateAccountData = z.infer<typeof createAccountFormSchema>;