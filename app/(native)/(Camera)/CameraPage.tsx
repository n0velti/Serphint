import React, { useRef, useState, useMemo, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'react-native-vision-camera'
import Reanimated, { useSharedValue, useAnimatedProps, useAnimatedGestureHandler, interpolate, Extrapolate } from 'react-native-reanimated'
import { useIsFocused } from '@react-navigation/core'
import { useIsForeground } from '../../../src/hooks/useIsForeground'
import { usePreferredCameraDevice } from '../../../src/hooks/usePreferredCameraDevice'
import type { GestureResponderEvent } from 'react-native'
import type { PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
import { CaptureButton } from './views/CaptureButton'

import { PressableOpacity } from 'react-native-pressable-opacity'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'


import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')
import { useRouter } from 'expo-router';

import {
    runAtTargetFps,
    useCameraDevice,
    useCameraFormat,
    useFrameProcessor,
    useLocationPermission,
    useMicrophonePermission,
  } from 'react-native-vision-camera'
  import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, MAX_ZOOM_FACTOR, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from './Constants'
  import type { CameraProps, CameraRuntimeError, PhotoFile, VideoFile } from 'react-native-vision-camera'
  import type { NativeStackScreenProps } from '@react-navigation/native-stack'
  import type { Routes } from './Routes'

import { examplePlugin } from './frame-processors/ExamplePlugin'
import { exampleKotlinSwiftPlugin } from './frame-processors/ExampleKotlinSwiftPlugin'


const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({ zoom: true });

const SCALE_FULL_ZOOM = 3
type Props = NativeStackScreenProps<Routes, 'CameraPage'>

function CameraPage({navigation}: Props) {
    const camera = useRef<Camera>(null)
    const [isCameraInitialized, setIsCameraInitialized] = useState(false)
    const microphone = useMicrophonePermission()
    const location = useLocationPermission()

    const insets = useSafeAreaInsets()
 

    const router = useRouter();

    const zoom = useSharedValue(1)
    const isPressingButton = useSharedValue(false)

    const isFocused = useIsFocused()
    const isForeground = useIsForeground()
    const isActive = isFocused && isForeground

    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back')
    const [enableHdr, setEnableHdr] = useState(false)
    const [flash, setFlash] = useState<'off' | 'on'>('off')
    const [enableNightMode, setEnableNightMode] = useState(false)

    // camera device settings
    const [preferredDevice] = usePreferredCameraDevice()
    let device = useCameraDevice(cameraPosition)

    if (preferredDevice != null && preferredDevice.position === cameraPosition) {
        // override default device with the one selected by the user in settings
        device = preferredDevice
    }

    const [targetFps, setTargetFps] = useState(60)

    const screenAspectRatio = 16 / 9 // Targeting 9:16 ratio (Portrait mode)

    const format = useCameraFormat(device, [
        { fps: targetFps },
        { videoAspectRatio: screenAspectRatio },
        { photoAspectRatio: screenAspectRatio },
        { videoResolution: 'max' },
        { photoResolution: 'max' },
    ])
    
    const CAMERA_WIDTH = SCREEN_WIDTH
    const CAMERA_AVAILABLE_HEIGHT = (height - insets.bottom) * 0.92
    const CAMERA_HEIGHT = CAMERA_AVAILABLE_HEIGHT// Height is 16/9 times the width


    const fps = Math.min(format?.maxFps ?? 1, targetFps)

    const supportsFlash = device?.hasFlash ?? false
    const supportsHdr = format?.supportsPhotoHdr
    const supports60Fps = useMemo(() => device?.formats.some((f: any) => f.maxFps >= 60), [device?.formats])
    const canToggleNightMode = device?.supportsLowLightBoost ?? false

    //#region Animated Zoom
    const minZoom = device?.minZoom ?? 1
    const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR)

    const cameraAnimatedProps = useAnimatedProps<CameraProps>(() => {
        const z = Math.max(Math.min(zoom.value, maxZoom), minZoom)
        return {
        zoom: z,
        }
    }, [maxZoom, minZoom, zoom])
    //#endregion

        //#region Callbacks
    const setIsPressingButton = useCallback(
        (_isPressingButton: boolean) => {
        isPressingButton.value = _isPressingButton
        },
        [isPressingButton],
    )
    const onError = useCallback((error: CameraRuntimeError) => {
        console.error(error)
    }, [])
    const onInitialized = useCallback(() => {
        console.log('Camera initialized!')
        setIsCameraInitialized(true)
    }, [])
    const onMediaCaptured = useCallback(
        (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
        console.log(`Media captured! ${JSON.stringify(media)}`)
        navigation.navigate('MediaPage', {
            path: media.path,
            type: type,
        })
        },
        [navigation],
    )
    const onFlipCameraPressed = useCallback(() => {
        setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
    }, [])
    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === 'off' ? 'on' : 'off'))
    }, [])
    //#endregion

    //#region Tap Gesture
    const onFocusTap = useCallback(
        ({ nativeEvent: event }: GestureResponderEvent) => {
        if (!device?.supportsFocus) return
        camera.current?.focus({
            x: event.locationX,
            y: event.locationY,
        })
        },
        [device?.supportsFocus],
    )
    const onDoubleTap = useCallback(() => {
        onFlipCameraPressed()
    }, [onFlipCameraPressed])
    //#endregion

    //#region Effects
    useEffect(() => {
        // Reset zoom to it's default everytime the `device` changes.
        zoom.value = device?.neutralZoom ?? 1
    }, [zoom, device])
    //#endregion

    //#region Pinch to Zoom Gesture
    // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
    // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
    const onPinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, { startZoom?: number }>({
        onStart: (_, context) => {
        context.startZoom = zoom.value
        },
        onActive: (event, context) => {
        // we're trying to map the scale gesture to a linear zoom here
        const startZoom = context.startZoom ?? 0
        const scale = interpolate(event.scale, [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM], [-1, 0, 1], Extrapolate.CLAMP)
        zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, startZoom, maxZoom], Extrapolate.CLAMP)
        },
    })
    //#endregion

    useEffect(() => {
        const f =
        format != null
            ? `(${format.photoWidth}x${format.photoHeight} photo / ${format.videoWidth}x${format.videoHeight}@${format.maxFps} video @ ${fps}fps)`
            : undefined
        console.log(`Camera: ${device?.name} | Format: ${f}`)
    }, [device?.name, format, fps])

    useEffect(() => {
        location.requestPermission()
    }, [location])

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
    
        runAtTargetFps(10, () => {
          'worklet'
         // examplePlugin(frame)
         // exampleKotlinSwiftPlugin(frame)
        })
      }, [])
    
      const videoHdr = format?.supportsVideoHdr && enableHdr
      const photoHdr = format?.supportsPhotoHdr && enableHdr && !videoHdr

      const handleClose = async () => {
        //navigation.navigate('index');
      }
      
      return (
        <View style={styles.container}>
          {device != null ? (
            <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
              <Reanimated.View onTouchEnd={onFocusTap} style={StyleSheet.absoluteFill}>
                <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                  <ReanimatedCamera
                    style={{ width: CAMERA_WIDTH, height: CAMERA_HEIGHT, zIndex: 1 }}
                    device={device}
                    isActive={isActive}
                    ref={camera}
                    onInitialized={onInitialized}
                    onError={onError}
                    onStarted={() => console.log('Camera started!')}
                    onStopped={() => console.log('Camera stopped!')}
                    onPreviewStarted={() => console.log('Preview started!')}
                    onPreviewStopped={() => console.log('Preview stopped!')}
                    onOutputOrientationChanged={(o) => console.log(`Output orientation changed to ${o}!`)}
                    onPreviewOrientationChanged={(o) => console.log(`Preview orientation changed to ${o}!`)}
                    onUIRotationChanged={(degrees) => console.log(`UI Rotation changed: ${degrees}°`)}
                    format={format}
                    fps={fps}
                    photoHdr={photoHdr}
                    videoHdr={videoHdr}
                    photoQualityBalance="quality"
                    lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                    enableZoomGesture={false}
                    animatedProps={cameraAnimatedProps}
                    exposure={0}
                    enableFpsGraph={false}
                    outputOrientation="device"
                    photo={true}
                    video={true}
                    audio={microphone.hasPermission}
                    enableLocation={location.hasPermission}
                    frameProcessor={frameProcessor}
                  />
                </TapGestureHandler>
              </Reanimated.View>
            </PinchGestureHandler>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.text}>Your phone does not have a Camera.</Text>
            </View>
          )}
    
          <CaptureButton
            style={styles.captureButton}
            camera={camera}
            onMediaCaptured={onMediaCaptured}
            cameraZoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            flash={supportsFlash ? flash : 'off'}
            enabled={isCameraInitialized && isActive}
            setIsPressingButton={setIsPressingButton}
          />

          
    
    
          <View style={styles.rightButtonRow}>
            <PressableOpacity style={styles.button} onPress={onFlipCameraPressed} disabledOpacity={0.4}>
              <IonIcon name="camera-reverse" color="white" size={24} />
            </PressableOpacity>
            {supportsFlash && (
              <PressableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
                <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
              </PressableOpacity>
            )}
            {supports60Fps && (
              <PressableOpacity style={styles.button} onPress={() => setTargetFps((t) => (t === 30 ? 60 : 30))}>
                <Text style={styles.text}>{`${targetFps}\nFPS`}</Text>
              </PressableOpacity>
            )}
            {supportsHdr && (
              <PressableOpacity style={styles.button} onPress={() => setEnableHdr((h) => !h)}>
                <MaterialIcon name={enableHdr ? 'hdr' : 'hdr-off'} color="white" size={24} />
              </PressableOpacity>
            )}
            {canToggleNightMode && (
              <PressableOpacity style={styles.button} onPress={() => setEnableNightMode(!enableNightMode)} disabledOpacity={0.4}>
                <IonIcon name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
              </PressableOpacity>
            )}
            <PressableOpacity style={styles.button} onPress={() => navigation.navigate('Devices')}>
              <IonIcon name="settings-outline" color="white" size={24} />
            </PressableOpacity>
            <PressableOpacity style={styles.button} onPress={() => navigation.navigate('CodeScannerPage')}>
              <IonIcon name="qr-code-outline" color="white" size={24} />
            </PressableOpacity>
          </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
 
      },
      captureButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: SAFE_AREA_PADDING.paddingBottom,
      },
      button: {
        marginBottom: CONTENT_SPACING,
        width: CONTROL_BUTTON_SIZE,
        height: CONTROL_BUTTON_SIZE,
        borderRadius: CONTROL_BUTTON_SIZE / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      rightButtonRow: {
        position: 'absolute',
        right: SAFE_AREA_PADDING.paddingRight,
        top: SAFE_AREA_PADDING.paddingTop,
      },
      leftButtonRow: {
        position: 'absolute',
        left: SAFE_AREA_PADDING.paddingLeft,
        top: SAFE_AREA_PADDING.paddingTop,
      },
      text: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    })
    

export default CameraPage;