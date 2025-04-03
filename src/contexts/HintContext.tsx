// src/contexts/ProductContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ProductData } from '../types/types';

const ProductContext = createContext<any>(null);

export const HintProvider = ({ children }: any) => {
  const [currentHint, setCurrentHint] = useState<ProductData | undefined>(undefined);
  const [showProduct, setShowProduct] = useState(false);

  return (
    <ProductContext.Provider value={{ currentHint, setCurrentHint, showProduct, setShowProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useHint = () => useContext(ProductContext);