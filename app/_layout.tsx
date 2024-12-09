import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';





export default function RootLayout() {

  return (
    <SafeAreaProvider style={{flex: 1,  }}>

      <SafeAreaView edges={['right', 'left']} style={{flex:1}}>
        <StatusBar hidden/>
        <NavigationIndependentTree>

        <Stack
          screenOptions={{headerShown: false,}}
        >
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />

        </Stack>
        </NavigationIndependentTree>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}
