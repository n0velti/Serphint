import React, { useCallback, useMemo, useState, useRef } from 'react'
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet, View, ActivityIndicator, PermissionsAndroid, Platform, Image, TouchableOpacity } from 'react-native'
import type { OnVideoErrorData, OnLoadData } from 'react-native-video'
import Video from 'react-native-video'
import { SAFE_AREA_PADDING } from './Constants'
import { useIsForeground } from '../../../src/hooks/useIsForeground'
import { PressableOpacity } from 'react-native-pressable-opacity'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native'
import  MediaLibrary from 'expo-media-library'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { Routes } from './Routes'
import { useIsFocused } from '@react-navigation/core'
import { Entypo } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'

import { set } from 'lodash'
const requestSavePermission = async (): Promise<boolean> => {
  // On Android 13 and above, scoped storage is used instead and no permission is needed
  if (Platform.OS !== 'android' || Platform.Version >= 33) return true

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  if (permission == null) return false
  let hasPermission = await PermissionsAndroid.check(permission)
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(permission)
    hasPermission = permissionRequestResult === 'granted'
  }
  return hasPermission
}

type OnLoadImage = NativeSyntheticEvent<ImageLoadEventData>
const isVideoOnLoadEvent = (event: OnLoadData | OnLoadImage): event is OnLoadData => 'duration' in event && 'naturalSize' in event

const SEARCH_AND_SUBMIT_HEIGHT = 80

type Props = NativeStackScreenProps<Routes, 'MediaPage'>
export function MediaPage({ navigation, route }: Props): React.ReactElement {
  const { path, type } = route.params
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false)
  const isForeground = useIsForeground()
  const isScreenFocused = useIsFocused()
  const isVideoPaused = !isForeground || !isScreenFocused
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none')

  const [selectedItem, setSelectedItem] = useState(null)
  const [isSelecting, setIsSelecting] = useState(false)

  const onMediaLoad = useCallback((event: OnLoadData | OnLoadImage) => {
    console.log('media has loaded.')
    handlePresentModalPress()
    if (isVideoOnLoadEvent(event)) {
      console.log(
        `Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`,
      )
    } else {
      const source = event.nativeEvent.source
      console.log(`Image loaded. Size: ${source.width}x${source.height}`)
    }
  }, [])
  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.')
    setHasMediaLoaded(true)
  }, [])
  const onMediaLoadError = useCallback((error: OnVideoErrorData) => {
    console.error(`failed to load media: ${JSON.stringify(error)}`)
  }, [])

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving')

      const hasPermission = await requestSavePermission()
      if (!hasPermission) {
        Alert.alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.')
        return
      }
      await MediaLibrary.saveToLibraryAsync(`file://${path}`)
      setSavingState('saved')
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      setSavingState('none')
      Alert.alert('Failed to save!', `An unexpected error occured while trying to save your ${type}. ${message}`)
    }
  }, [path, type])

  const source = useMemo(() => ({ uri: `file://${path}` }), [path])

  const screenStyle = useMemo(() => ({ opacity: hasMediaLoaded ? 1 : 0 }), [hasMediaLoaded])


  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [SEARCH_AND_SUBMIT_HEIGHT, '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    
  }, []);

  const handlePickProduct = useCallback(() => {

   
        bottomSheetModalRef.current?.snapToIndex(1);
        setIsSelecting(true);
      
   
  }, []);

  return (
    <BottomSheetModalProvider>
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" onLoadEnd={onMediaLoadEnd} onLoad={onMediaLoad} />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          paused={isVideoPaused}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onLoad={onMediaLoad}
          onError={onMediaLoadError}
        />
      )}

      <PressableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </PressableOpacity>

      <PressableOpacity style={styles.saveButton} onPress={onSavePressed} disabled={savingState !== 'none'}>
        {savingState === 'none' && <IonIcon name="download" size={35} color="white" style={styles.icon} />}
        {savingState === 'saved' && <IonIcon name="checkmark" size={35} color="white" style={styles.icon} />}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </PressableOpacity>



      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={0}
        onChange={handleSheetChanges}
        style={styles.sheetModal}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        enableDismissOnClose={false}
        enablePanDownToClose={false}
        handleStyle={{ display: 'none' }}
      >

        <BottomSheetView style={styles.sheetView}>
     
        <BlurView intensity={10} style={[StyleSheet.absoluteFill, {
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          overflow: 'hidden',
     
        }]} />

          {isSelecting ? 
          (
            <SelectItem
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isSelecting={isSelecting}
              setIsSelecting={setIsSelecting}
              bottomSheetModalRef={bottomSheetModalRef}
            />

          )
          :
          (
          <TouchableOpacity style={styles.searchAndSubmit} onPress={handlePickProduct}>
           <Text style={styles.searchText}>
            {selectedItem ? 
              selectedItem?.productName
            : 
              'Pick Product...'
            }

           </Text>
           <Entypo name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        )}  

        </BottomSheetView>
      </BottomSheetModal>
   
    </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop,
    right: SAFE_AREA_PADDING.paddingRight,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
  searchAndSubmit: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between',
    height: SEARCH_AND_SUBMIT_HEIGHT,
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
 
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', 
  },
  sheetModal: {
    flex: 1,

  },
  sheetView: {
    flex: 1,
    backgroundColor: 'transparent',
  
    alignItems: 'center',
    justifyContent: 'center',
  },
})
