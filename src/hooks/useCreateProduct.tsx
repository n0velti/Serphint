import {create} from 'zustand';
import { z } from 'zod';
import { brandFormSchema, BrandFormData } from '../schemas/BrandFormSchema';


type createBrandState = {
    isCreatingBrand: boolean;
    setIsCreatingBrand: (isCreating: boolean) => void;

    currentBrandStep: number;
    setBrandCurrentStep: (step: number) => void;

    savedFormData: Record<string, any>;
    setSavedFormData: (data: Record<string, any>) => void;

    isStepZeroComplete: boolean;
    setStepZeroComplete: (isComplete: boolean) => void;

    brandLogoUri: string;
    setBrandLogoUri: (uri: string) => void;

    form: Partial<BrandFormData>;
    setField: (field: keyof BrandFormData, value: any) => void;
    getField: (name: keyof BrandFormData) => any;
    
    validateForm: () => {
        success: boolean;
        data?: BrandFormData;
        errors?: z.ZodFormattedError<BrandFormData>;
    };
    resetForm: () => void;
};

export const useCreateBrand = create<createBrandState>((set, get) => ({
    isCreatingBrand: false,
    setIsCreatingBrand: (isCreating) => set({isCreatingBrand: isCreating}),

    currentBrandStep: -1,
    setBrandCurrentStep: (step) => set({currentBrandStep: step}),

    savedFormData: {},
    setSavedFormData: (data) => set({savedFormData: data}),

    isStepZeroComplete: false,
    setStepZeroComplete: (isComplete) => set({isStepZeroComplete: isComplete}),

    brandLogoUri: '',
    setBrandLogoUri: (uri) => set({brandLogoUri: uri}),

    form: {},
    setField: (field, value) =>
        set((state) => ({
        form: {
            ...state.form,
            [field]: value,
        },
        })),
    getField: (name: keyof BrandFormData) => get().form[name],

    validateForm: () => {
        const result = brandFormSchema.safeParse(get().form);
        if (result.success) {
        return { success: true, data: result.data };
        } else {
        return {
            success: false,
            errors: result.error.format(),
        };
        }
    },
    resetForm: () => set({ form: {} }),

}));