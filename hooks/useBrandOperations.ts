import { generateClient } from 'aws-amplify/data';
import { uploadData } from 'aws-amplify/storage'; 
import type { Schema } from '@/amplify/data/resource';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const client = generateClient<Schema>();

export interface BrandFormData {
  brandName: string;
  slogan: string;
  location: string;
  description: string;
  logoUri?: string;
}

export const useBrandOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadLogo = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const key = `brands/logos/${uuidv4()}-${Date.now()}`;
      
      const uploadLogoData = await uploadData({
        path: key,
        data: blob,
        options: {
          bucket: 'SerphintBrandLogoStorage'
        }
    }).result;
      
      return uploadLogoData;
    } catch (err) {
      console.error('Error uploading logo:', err);
      throw err;
    }
  };

  const createBrand = async (brandData: BrandFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      let uploadLogoData = undefined;
      if (brandData.logoUri) {
        uploadLogoData = await uploadLogo(brandData.logoUri);
      }
      const result = await client.models.Brand.create({
        ...brandData,
        logoUri: uploadLogoData?.path,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create brand'));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const updateBrand = async (id: string, brandData: Partial<BrandFormData>) => {
    setLoading(true);
    setError(null);
    
    try {
      let logoKey = brandData.logoUri;
      let uploadLogoData = undefined;

      if (brandData.logoUri?.startsWith('file://')) {
        uploadLogoData = await uploadLogo(brandData.logoUri);
      }

      const result = await client.models.Brand.update({
        id,
        ...brandData,
        logoUri: logoKey ? logoKey : uploadLogoData?.path,
        updatedAt: new Date().toISOString(),
      });

      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update brand'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBrand = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await client.models.Brand.get({ id });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch brand'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const listBrands = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await client.models.Brand.list();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to list brands'));
      throw err;
    } finally {
        setLoading(false);
      }
    };
  
    return {
      createBrand,
      updateBrand,
      getBrand,
      listBrands,
      loading,
      error
    };
  };
