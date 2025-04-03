import React from 'react';


import { GestureHandlerRootView } from 'react-native-gesture-handler';


import {Stack} from 'expo-router';
import { HintProvider } from '../../src/contexts/HintContext';





export default function NativeLayout() {



  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <HintProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen 
      name="screens/brand/BlankLargeTextInput"
      />

  <Stack.Screen 
      name="screens/TimeAvailability"
      />  
    </Stack>
    </HintProvider>
 
    </GestureHandlerRootView>
  );
}
