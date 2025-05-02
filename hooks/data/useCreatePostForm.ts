import { create } from 'zustand';
import { z } from 'zod';
import { createPostSchema, CreatePostData } from '../../schemas/CreatePostSchema';

type createFormState = {
  savedFormData: Record<string, any>;
  setSavedFormData: (data: Record<string, any>) => void;

  form: Partial<CreatePostData>;
  setField: (field: keyof CreatePostData, value: any) => void;
  getField: (name: keyof CreatePostData) => any;
  getForm: () => Partial<CreatePostData>;

  validateForm: () => {
    success: boolean;
    data?: CreatePostData;
    errors?: z.ZodFormattedError<CreatePostData>;
  };

  resetForm: () => void;
};

export const useCreatePostForm = create<createFormState>((set, get) => ({
  savedFormData: {},
  setSavedFormData: (data) => set({ savedFormData: data }),

  form: {},
  setField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),

  getField: (name) => get().form[name],
  getForm: () => get().form,

  validateForm: () => {
    const result = createPostSchema.safeParse(get().form);
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