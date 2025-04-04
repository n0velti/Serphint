import type {Schema} from '../../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import {BrandFormData} from '../../schemas/BrandFormSchema';


const client = generateClient<Schema>()

export const useBrandQueries = () => {

    const createBrand = async (brandData: BrandFormData) => {
        try {
            console.log("Creating brand with data:", brandData);
          const brand = await client.models.Brand.create(brandData);
            console.log("Brand created successfully:", brand);
          return brand;
        } catch (error) {
          console.error("Error creating brand:", error);
          throw error;
        }
      };

    return { createBrand };
}
