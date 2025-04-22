import {create} from 'zustand';
import { z } from 'zod';
import { signInFormSchema, SignInData } from '../../schemas/SignInSchema';


type createAccountState = {


    savedFormData: Record<string, any>;
    setSavedFormData: (data: Record<string, any>) => void;


    form: Partial<SignInData>;
    setField: (field: keyof SignInData, value: any) => void;
    getField: (name: keyof SignInData) => any;
    
    validateForm: () => {
        success: boolean;
        data?: SignInData;
        errors?: z.ZodFormattedError<SignInData>;
    };
    resetForm: () => void;
};

export const useSignIn = create<createAccountState>((set, get) => ({
 
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
    getField: (name: keyof SignInData) => get().form[name],

    validateForm: () => {
        const result = signInFormSchema.safeParse(get().form);
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