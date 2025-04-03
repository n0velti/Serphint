
import { z } from 'zod';
import { Location } from '../types/types';
import { hide } from 'expo-router/build/utils/splash';


export const brandFormSchema = z.object({
    brandLogoUri: z.string().optional(),
    brandName: z.string(),
    isFranchiseLocation: z.boolean().optional(),
    brandLocation: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        streetNumber: z.string().optional(),
        streetName: z.string().optional(),
        postalCode: z.string().optional(),
        miniDisplayName: z.string().optional(),
        fullDisplayName: z.string().optional(),
    }).optional(),
    hideExactLocation: z.boolean().optional(),
    brandCategory: z.array(z.string()).optional(),
    brandSlogan: z.string().optional(),
    brandDescription: z.string().optional(),


  });
export type BrandFormData = z.infer<typeof brandFormSchema>;