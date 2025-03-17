// app/_layout.tsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { usePlatform } from '../src/hooks/usePlatform';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default function RootLayout() {
  const { isWeb, isNative, platform } = usePlatform();
  const router = useRouter();
  
  useEffect(() => {
    console.log('Platform detection:', { isWeb, isNative, platform });
    
    // Navigate after the component is mounted
    if (isWeb) {
      router.replace('/(web)');
    } else if (isNative) {
      router.replace('/(native)');
    }
  }, [isWeb, isNative, platform, router]);

  // Always render a Stack navigator first to avoid the NOBRIDGE error
  return (
    <ThemeProvider>
    <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />

      <Stack.Screen name="(web)" />
      <Stack.Screen name="(native)" />

        

      
    </Stack>
    </ThemeProvider>
  );
}