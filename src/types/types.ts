export interface ButtonWithIcon {
  icon: string;
  label: string;
  path: string;
  onClick: () => void;
  disabled: boolean;
  isActive: boolean;
}

export interface Location {
  city: string;
  state?: string;
  province?: string;
  country: string;
  latitude: number;
  longitude: number;
  streetNumber: string;
  streetName: string;
  postalCode: string;
  miniDisplayName: string;
  fullDisplayName: string;
}

export interface BrandBankAccount {
  brandid: string;
  accountHolderName: string;
  currency: string;
  country: string;  
  accountNumber: string;
  accountType: string;
  bankName: string;
  routingNumber: string;
}

export interface ProductMedia {
  id: string;
  mediaType: "image" | "video";
  mediaUrl: string;
}

export interface Product {
  productTitle: string;
  productBrandTitle: string;
  productDollarPrice: string;
  productCentPrice: string;
  productLocation: Location;
  productMedia: ProductMedia[];
}

export interface Hint {
  hintType: "product";
  hintTitle: string;
  hintDescription: string;
  hintMedia: ProductMedia[];
  product: Product;
}

export interface User {
  username: string;
  userAvatar: string;
  userLocation: Location;
  firstName: string;
  lastName: string;
}

export interface Brand {
    brandLogoUri: string;
    brandName: string
    isFranchiseLocation: boolean;
    brandLocation: Location;
    hideExactLocation: boolean;
    brandCategory: string[];
    brandSlogan: string;
    brandDescription: string;
}

export interface ProductData {
  product: Product;
  hint: Hint;
  user?: User;
  brand: Brand;
}

export type ProductDataArray = ProductData[];
