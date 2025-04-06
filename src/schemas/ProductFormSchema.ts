
import { z } from 'zod';
import { Location } from '../types/types';
import { hide } from 'expo-router/build/utils/splash';


export const productFormSchema = z.object({
    productMedia: z.object({
        uri: z.string(),
        type: z.enum(['image', 'video']),
    }).array().optional(),

    productName: z.string(),
    productBrandId: z.string(),


    productLocation: z.object({
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

   
    productDescription: z.string().optional(),
    productQuantity: z.number().optional(),
    productHasNoQuantityLimit: z.boolean().optional(),
    


    productDollarPrice: z.number().optional(),
    productCentsPrice: z.number().optional(),
    productHintValue: z.number().optional(),
    productHintType: z.enum(['percentage', 'dollar']).optional(),

  });
export type ProductFormData = z.infer<typeof productFormSchema>;