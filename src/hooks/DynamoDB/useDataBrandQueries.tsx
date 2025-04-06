import type {Schema} from '../../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import {BrandFormData} from '../../schemas/BrandFormSchema';

import { useStorageBrandQueries } from '../S3/useStorageBrandQueries';

const client = generateClient<Schema>()

export const useBrandQueries = () => {

    const { uploadBrandImage } = useStorageBrandQueries();

    const createBrand = async (brandData: BrandFormData) => {
        try {
            console.log("Creating brand with data:", brandData);
          const brand = await client.models.Brand.create(brandData);

          console.log("Brand created:", brand);

          const brandImageUri = await uploadBrandImage(brandData.brandLogoUri, brand.data?.id);

          const response = await client.models.Brand.update({
            id: brand.data?.id,
            brandLogoUri: brandImageUri,
          });
      
          return response.data;
        } catch (error) {
          console.error("Error creating brand:", error);
          throw error;
        }
      };

    return { createBrand };
}
