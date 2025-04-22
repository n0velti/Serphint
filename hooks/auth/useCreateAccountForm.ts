import {create} from 'zustand';
import { z } from 'zod';
import { createAccountFormSchema, CreateAccountData } from '../../schemas/CreateAccountSchema';


type createAccountState = {


    savedFormData: Record<string, any>;
    setSavedFormData: (data: Record<string, any>) => void;


    form: Partial<CreateAccountData>;
    setField: (field: keyof CreateAccountData, value: any) => void;
    getField: (name: keyof CreateAccountData) => any;
    
    validateForm: () => {
        success: boolean;
        data?: CreateAccountData;
        errors?: z.ZodFormattedError<CreateAccountData>;
    };
    resetForm: () => void;
};

export const useCreateAccount = create<createAccountState>((set, get) => ({
 
    savedFormData: {},
    setSavedFormData: (data) => set({savedFormData: data}),


    form: {},
    setField: (field, value) =>
        set((state) => ({
        form: {
            ...state.form,
            [field]: value,
        },
        })),
    getField: (name: keyof CreateAccountData) => get().form[name],

    validateForm: () => {
        const result = createAccountFormSchema.safeParse(get().form);
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