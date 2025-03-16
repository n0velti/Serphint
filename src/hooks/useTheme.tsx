// src/hooks/useTheme.tsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { usePlatform } from './usePlatform';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  const platform = usePlatform();
  
  return {
    theme,
    platform
  };
};