// components/CustomTabBar.tsx
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ProductData } from '../../types/types';
import {Image} from 'expo-image'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import CreateProductBrandView from './CreateProductBrandView';

type TabBarProps = BottomTabBarProps & {
    setCurrentIndex: (index: number) => void;
    currentIndex: number;
    setOpenProductBrand: (open: boolean) => void;

    currentHint: ProductData;
};


export default function SerphintTabBar({ state, descriptors, navigation, setCurrentIndex,currentIndex, currentHint, setOpenProductBrand}: TabBarProps) {

  const insets = useSafeAreaInsets();
  
  const accountIndex = state.routes.findIndex(route => route.name === 'Profile');
  const isAccountFocused = state.index === accountIndex;

  const homeIndex = state.routes.findIndex(route => route.name === 'index');
  const isSerphintFocused = state.index === homeIndex;

  const cameraIndex = state.routes.findIndex(route => route.name === 'CameraLayout');
  const isCameraLayoutFocused = state.index === cameraIndex;



    useEffect(() => {
        setCurrentIndex(state.index);
    },  [state.index]);


    const handleTabPress = (routeName: string) => {
      const index = state.routes.findIndex(route => route.name === routeName);
      const route = state.routes[index];
      const isFocused = state.index === index;
    
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      });
    
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

   

  return (
    <View style={[styles.tabBar, {marginBottom: insets.bottom}]}>


      <View style={styles.leftSide}>
        <TouchableOpacity onPress={() => {handleTabPress('Profile')}} style={[styles.accountButton, isAccountFocused && styles.focusedTab]} activeOpacity={0.7}>
          <Image source={currentHint?.user?.userAvatar} style={styles.avatarIcon} />
          <Text style={styles.accountName}>{currentHint?.user?.firstName}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handleTabPress('index')}} style={[styles.serphintHomeButton, isSerphintFocused && styles.focusedTab]} activeOpacity={0.7}>
       
        <Entypo name="light-bulb" size={15} color="black" style={styles.serphintHomeIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.rightSide}>
        {!isCameraLayoutFocused ? 
        <TouchableOpacity onPress={()=> {handleTabPress('CameraLayout')}} style={[
          styles.addHintButton,
          isCameraLayoutFocused && styles.focusedTab
          ]} activeOpacity={0.7}>
         <Entypo name="plus" size={18} color="white" style={styles.addHintIcon}/>
        </TouchableOpacity>

        :
        <TouchableOpacity onPress={() => {setOpenProductBrand(true)}} style={[
          styles.addProductBrandButton,
          isCameraLayoutFocused && styles.focusedCameraTab
          ]} activeOpacity={0.7}>
            <Text style={styles.addProductBrandStyles}> Add Product/Brand </Text>
        </TouchableOpacity>
    }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingHorizontal: 15,

  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    backgroundColor: 'transparent',

  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 5,
    borderRadius: 99,
    paddingHorizontal: 5,
    gap: 7,
    justifyContent: 'center',
    alignContent: 'center',
    height: 36,
  },
  avatarIcon: {
    width: 26,
    height: 26,
    borderRadius: 15,

  },
  accountName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 3,
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  addHintButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'lightgray',

    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    
    borderRadius: 99,
  },
  addHintIcon: {
    color: 'white',
  },

  serphintHomeButton: { 
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'lightgray',

    borderRadius: 99,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serphintHomeIcon: {
    color: 'white',

  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',

  },
  focusedTab: {
    borderBottomWidth: 2,
    borderColor: 'white',


  },
  focusedCameraTab: {
    borderBottomWidth: 2,
    borderColor: 'red',
  },
  addProductBrandButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
  },
  addProductBrandStyles: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
});