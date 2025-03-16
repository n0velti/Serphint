// src/contexts/ThemeContext.tsx
import React, { createContext } from 'react';
import { defaultTheme } from '../constants/theme';

// Define the shape of our context
type ThemeContextType = {
  theme: typeof defaultTheme;
};

// Create the context with default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
});

// Simple provider that just provides the default theme
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};