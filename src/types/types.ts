export interface ButtonWithIcon {
  icon: string;
  label: string;
  path: string;
  onClick: () => void;
  disabled: boolean;
  isActive: boolean;
}

export interface ProductLocation {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  streetNumber: string;
  streetName: string;
  zipCode: string;
  fullDisplayName: string;
}

export interface ProductMedia {
  mediaType: "image" | "video";
  mediaUrl: string;
}

export interface Product {
  productTitle: string;
  productBrandTitle: string;
  productDollarPrice: string;
  productCentPrice: string;
  productLocation: ProductLocation;
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
  userLocation: ProductLocation;
  firstName: string;
  lastName: string;
}

export interface Brand {
  brandName: string;
  brandDescription: string;
  brandLogo: string;
}

export interface ProductData {
  product: Product;
  hint: Hint;
  user?: User;
  brand: Brand;
}

export type ProductDataArray = ProductData[];
