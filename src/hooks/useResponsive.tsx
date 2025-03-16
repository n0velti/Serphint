// src/hooks/useResponsive.tsx
import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { usePlatform } from './usePlatform';

type DeviceType = 'phone' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';

export const useResponsive = () => {
  const platform = usePlatform();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [deviceType, setDeviceType] = useState<DeviceType>('phone');
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  const determineDeviceType = (size: ScaledSize) => {
    const { width } = size;
    if (width < 768) return 'phone';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const determineOrientation = (size: ScaledSize) => {
    return size.width > size.height ? 'landscape' : 'portrait';
  };

  useEffect(() => {
    const updateDimensions = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
      setDeviceType(determineDeviceType(window));
      setOrientation(determineOrientation(window));
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);

    // Set initial values
    setDeviceType(determineDeviceType(dimensions));
    setOrientation(determineOrientation(dimensions));

    return () => {
      // Clean up listener
      subscription.remove();
    };
  }, []);

  // Responsive breakpoints
  const isPhone = deviceType === 'phone';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  const isPortrait = orientation === 'portrait';
  const isLandscape = orientation === 'landscape';

  // Helper for responsive values
  const responsive = <T,>(options: {
    phone?: T;
    tablet?: T;
    desktop?: T;
    default: T;
  }): T => {
    if (isPhone && options.phone !== undefined) return options.phone;
    if (isTablet && options.tablet !== undefined) return options.tablet;
    if (isDesktop && options.desktop !== undefined) return options.desktop;
    return options.default;
  };

  return {
    width: dimensions.width,
    height: dimensions.height,
    platform,
    deviceType,
    orientation,
    isPhone,
    isTablet, 
    isDesktop,
    isPortrait,
    isLandscape,
    responsive,
  };
};