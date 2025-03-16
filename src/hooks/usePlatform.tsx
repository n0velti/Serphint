// src/hooks/usePlatform.ts
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

type PlatformType = 'web' | 'ios' | 'android' | 'native';

export function usePlatform() {
  // Initialize with platform detection
  const [platformState, setPlatformState] = useState(() => {
    // Primary check - React Native's Platform.OS
    const isWebPrimary = Platform.OS === 'web';
    const isIOSPrimary = Platform.OS === 'ios';
    const isAndroidPrimary = Platform.OS === 'android';
    
    // Secondary check - Window object existence
    const isWebSecondary = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    // Combined determination - web must pass both checks
    const isWeb = isWebPrimary && isWebSecondary;
    const isIOS = isIOSPrimary;
    const isAndroid = isAndroidPrimary;
    const isNative = isIOS || isAndroid;
    
    // Get more detailed info about the device
    const deviceInfo = {
      brand: Constants?.platform?.ios?.model || Constants?.platform?.android?.brand || 'unknown',
    };
    
    // Get browser info for web
    const browser = isWeb ? getBrowserInfo() : null;
    
    // Current platform as string
    const platform: PlatformType = isWeb ? 'web' : isIOS ? 'ios' : isAndroid ? 'android' : 'native';
    
    return {
      isWeb,
      isIOS,
      isAndroid,
      isNative,
      deviceInfo,
      browser,
      platform
    };
  });

  // Verify platform detection after mount (useful for SSR scenarios)
  useEffect(() => {
    const isWebVerified = typeof window !== 'undefined' && typeof document !== 'undefined';
    if (isWebVerified && !platformState.isWeb) {
      // Fix any incorrect platform detections after mount
      setPlatformState(prevState => ({
        ...prevState,
        isWeb: true,
        isNative: false,
        platform: 'web'
      }));
      console.log('Platform detection corrected to web after mount');
    }
  }, []);

  return platformState;
}

// Helper function to determine browser
function getBrowserInfo() {
  if (typeof window === 'undefined') return null;
  
  const userAgent = window.navigator.userAgent;
  
  // Simple browser detection
  const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isEdge = /Edge/.test(userAgent);
  
  return { isChrome, isSafari, isFirefox, isEdge };
}