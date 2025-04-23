import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();


export const useProductOperations = () => { 
    const getProducts = async () => {
        try {

            const products = await client.models.Product.list(
            //     {
            //     authMode: 'userPool',
            // }
        );
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };


    return {
        getProducts,
    };
}


