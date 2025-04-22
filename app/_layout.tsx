//layout.tsx

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState} from 'react';
import 'react-native-reanimated';

import Menu from '@/components/ui/web/Menu';

import { useColorScheme } from '@/hooks/useColorScheme';

import { usePlatform } from '@/hooks/usePlatform';

import NavBar from '@/components/ui/web/NavBar';

import { useAuthProvider } from '@/hooks/auth/useAuthProvider';

import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"


Amplify.configure(outputs)

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const platform = usePlatform();
  const colorScheme = useColorScheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  useEffect(() => {
    useAuthProvider.getState().fetchUser();
  }, []);


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
        <NavBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
   
        <Stack screenOptions={{headerShown: false,

          contentStyle: {
            backgroundColor: 'white'
          },
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="[productId]" options={{ headerShown: false }} />
          <Stack.Screen name="/CreateAnAccount" options={{ headerShown: false }} />
          <Stack.Screen name="/SignIn" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        {isMenuOpen && (
          <Menu
          setIsMenuOpen={setIsMenuOpen}
          />

        )}
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
