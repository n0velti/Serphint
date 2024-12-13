import React, { createContext, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const BrandFormContext = createContext();

const validationSchema = yup.object({
  brandName: yup.string().required('Brand name is required'),
  slogan: yup.string().required('Slogan is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  logoUri: yup.string().nullable(),
});

export const BrandFormProvider = ({ children }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      brandName: '',
      slogan: '',
      location: '',
      description: '',
      logoUri: null,
    },
  });

  return (
    <BrandFormContext.Provider value={methods}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </BrandFormContext.Provider>
  );
};

export const useBrandForm = () => {
  const context = useContext(BrandFormContext);
  if (!context) {
    throw new Error('useBrandForm must be used within a BrandFormProvider');
  }
  return context;
};