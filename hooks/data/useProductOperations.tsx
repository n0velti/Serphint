import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();


export const useProductOperations = () => { 



    const createProduct = async () => {


        const productData = {
            productName: 'Sample Product',
            productDescription: 'This is a sample product description.',
            productDollarFigureCost: 19,
            productCentFigureCost: 99,
            productBaseCurrency: 'USD',
            productMedia: [
                {
                    mediaType: 'image',
                    mediaUri: 'https://example.com/image.jpg',
                },
            ],
            // Add other necessary fields here
        };


        try {
            const product = await client.models.Product.create(productData, {
                authMode: 'userPool',
            }
            );
            console.log('Product created successfully:', product);
            return product;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }


    const getProducts = async (text: string) => {
        try {

            const products = await client.models.Product.list(
                {
                    filter: {
                        productName: {
                            contains: text,
                        },
                    },
              
                
                    authMode: 'userPool',
                }
        );
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };


    return {
        getProducts,
        createProduct,
    };
}


