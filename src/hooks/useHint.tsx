// store/useHint.tsx
import { create } from 'zustand';
import { ProductData } from '../types/types';

type HintState = {
  currentHint: ProductData | undefined;
  setCurrentHint: (hint: ProductData | undefined) => void;
};

export const useHint = create<HintState>((set) => ({
  currentHint: undefined,
  setCurrentHint: (hint) => set({ currentHint: hint }),
}));