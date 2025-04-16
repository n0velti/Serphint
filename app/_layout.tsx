import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo} from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { usePlatform } from '@/hooks/usePlatform';

import NavBar from '@/components/ui/web/NavBar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const platform = usePlatform();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  const appInitialized = useMemo(() => {
    return loaded && platform;
  }, [loaded, platform]);


  useEffect(() => {
    if (appInitialized) {
      SplashScreen.hideAsync();
    }
  }, [appInitialized]);

  if (!appInitialized) {
    return null;
  }

  if(platform.isWeb) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavBar/>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="[productId]/[userId]" options={{ headerShown: false }} />
          <Stack.Screen name="[userId]/CreateAnAccount" options={{ headerShown: false }} />
          <Stack.Screen name="[userId]/SignIn" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  if (platform.isIOS) {
    console.log('iOS platform detected');
  }

  if (platform.isAndroid) {
    console.log('Android platform detected');
  }


}
