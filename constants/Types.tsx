// types.tsx

export interface Product {
    id: number;
    name: string;
    price: number;
    coverImage: string;
  }
  
  export interface User {
    id: number;
    name: string;
    avatar: string;
    comment: string;
  }
  
  export interface SampleItem {
    id: number;
    product: Product;
    user: User;
    likes: number;
    dislikes: number;
    comments: number;
    shares: number;
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
  }
  
  export type SampleDataType = SampleItem[];