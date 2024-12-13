import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
      <SafeAreaProvider style={{flex: 1}}>
        <SafeAreaView edges={['right', 'left']} style={{flex:1}}>
          <StatusBar hidden/>
          <NavigationIndependentTree>
            <Stack
              screenOptions={{
                header: () => null, // Remove default header
              }}
            >
              <Stack.Screen 
                name="(tabs)" 
                options={{
                  headerShown: false // Hide header for tabs
                }}
              />
              <Stack.Screen 
                name="(screens)/ProductsAndBrands"
                options={{
                  headerShown: true,
                  //header: () => <ProductsHeader /> // Custom header for this screen
                }}
              />
            </Stack>
          </NavigationIndependentTree>
        </SafeAreaView>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
