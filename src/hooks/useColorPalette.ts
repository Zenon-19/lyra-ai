import { useTheme } from '../contexts/ThemeContext';

// Color palette based on the provided reference
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  surface: string;
}

// Define palettes for each theme
const palettes: Record<string, ColorPalette> = {
  light: {
    primary: '#DEB3AD', // Dusty Rose
    secondary: '#DE847B', // Coral
    accent: '#B95C50', // Tiger Lily
    background: '#F7F7F8', // Off-white
    text: '#3B0404', // Deep version of the dark color
    surface: '#FFFFFF',
  },
  dark: {
    primary: '#B95C50', // Tiger Lily (as primary)
    secondary: '#DE847B', // Coral
    accent: '#DEB3AD', // Dusty Rose (as accent)
    background: '#1F1F1F', // Charcoal
    text: '#F7F7F8', // Off-white
    surface: '#2C2C2C',
  },
  zen: {
    primary: '#DEB3AD', // Dusty Rose (softer)
    secondary: '#F7F7F8', // Off-white
    accent: '#DE847B', // Coral (subtle accent)
    background: '#FFFFFF', // Pure white
    text: '#3B0404', // Deep dark (more subdued)
    surface: '#F5F5F5',
  }
};

export const useColorPalette = () => {
  const { theme } = useTheme();
  return palettes[theme];
};

// Helper to convert hex to RGB values for CSS variables
export const hexToRgb = (hex: string) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return as RGB string
  return `${r}, ${g}, ${b}`;
};
