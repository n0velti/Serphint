import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {PermissionsPage} from '../camera/PermissionsPage'
import CameraPage from '../camera/CameraPage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import {MediaPage} from '../camera/MediaPage'
import { View, Text, Dimensions } from 'react-native';

import type { CameraProps, CameraRuntimeError, PhotoFile, VideoFile } from 'react-native-vision-camera'
import {
  runAtTargetFps,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
  useLocationPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const Stack = createNativeStackNavigator()


function CameraLayout(props: any) {
    const cameraPermission = Camera.getCameraPermissionStatus()
    const microphonePermission = Camera.getMicrophonePermissionStatus()
    const insets = useSafeAreaInsets()
    const CAMERA_HEIGHT = height

    console.log(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`)
  
    const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'
    return (
        <GestureHandlerRootView style={[styles.root, {height: CAMERA_HEIGHT}]}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationTypeForReplace: 'push',
            }}
            initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraPage'}>
            <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
            {/* <Stack.Screen name="CodeScannerPage" component={CodeScannerPage} /> */}
            <Stack.Screen
              name="MediaPage"
              component={MediaPage}
              options={{
                animation: 'none',
                presentation: 'transparentModal',
              }}
            />
            {/* <Stack.Screen name="Devices" component={DevicesPage} /> */}
          </Stack.Navigator>
        </GestureHandlerRootView>
    )
  }

  export default CameraLayout;
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
  
    },
  })
  