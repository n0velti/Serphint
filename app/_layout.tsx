import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { usePlatform } from '../src/hooks/usePlatform';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';


Amplify.configure(outputs);

export default function RootLayout() {
  const { isWeb, isNative } = usePlatform();
  const router = useRouter();

  useEffect(() => {
    console.log('Platform detection:', { isWeb, isNative });

    // Only navigate once when the app mounts
    if (isWeb) {
      router.replace('(web)');
    } else if (isNative) {
      router.replace('(native)');
    }
  }, []); // Run only once on mount

  if (isNative) {
    return (
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
 
          <Stack.Screen name="(native)" />
        </Stack>
      </ThemeProvider>
    );
  }

  if (isWeb) {
    return (
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(web)"  />
        </Stack>
      </ThemeProvider>
    );
  }

  return null;
}