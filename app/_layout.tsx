//layout.tsx

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
import SubNavBar from '@/components/ui/web/SubNavBar';
import { View, StyleSheet} from 'react-native';


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
      <View style={styles.container}>
        <NavBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>

        {/* <SubNavBar/> */}
   
        <Stack screenOptions={{headerShown: false,

          contentStyle: {
            backgroundColor: 'white'
          },
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="[productId]" options={{ headerShown: false }} />
          <Stack.Screen name="/CreateAnAccount" options={{ headerShown: false }} />
          <Stack.Screen name="/SignIn" options={{ headerShown: false }} />
          <Stack.Screen name="/NewPost" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        {isMenuOpen && (
          <Menu
          setIsMenuOpen={setIsMenuOpen}
          />

        )}
      </View>
    );
  }

  if (platform.isIOS) {
    console.log('iOS platform detected');
  }

  if (platform.isAndroid) {
    console.log('Android platform detected');
  }


}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
};
