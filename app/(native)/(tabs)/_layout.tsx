import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, {useMemo, useRef, useCallback, useEffect, useState} from 'react';
import ActionView from '../../../src/components/common/ActionsContainer/ActionView';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import SerphintTabBar from '../../../src/components/native/SerphintTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetScrollView}from '@gorhom/bottom-sheet';
import Animated, { useSharedValue, useDerivedValue, useAnimatedReaction, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import BrandMenu from '../../../src/components/native/Brand/BrandMenu';

import { ProductData } from '../../../src/types/types';

import Product from '../../../src/components/native/Product/Product';
import { HintProvider, useHint } from '../../../src/contexts/HintContext';
import CreateProductBrandView from '../../../src/components/native/CreateProductBrandView';

const {width, height} = Dimensions.get('window');


export default function TabLayout() {
    const {currentHint } = useHint();

    const productSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["100%"], []);

    const [showBrandMenu, setShowBrandMenu] = useState(false);


    const [openProductBrand, setOpenProductBrand] = useState(false);

    
    const [currentIndex, setCurrentIndex] = useState(0);


    const insets = useSafeAreaInsets();

    const bottomSheetPosition = useSharedValue(0);

    useAnimatedReaction(
      () => bottomSheetPosition.value,
      (value) => {
         // console.log("Updated BottomSheet Position:", value);
      }
  );

    const derivedBottomSheetPosition = useDerivedValue(() => {
      return bottomSheetPosition.value; // Keeps updates on UI thread

    }, [bottomSheetPosition]);

    const menuTranslateX = useSharedValue(-width); // hidden off-screen

    const brandMenuAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: menuTranslateX.value }],
      };
    }, []);

    useEffect(() => {
      menuTranslateX.value = withTiming(showBrandMenu ? 0 : -width, { duration: 300 });
    }, [showBrandMenu]);

  

     // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

    // callbacks
   const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    
  }, []);





  
  return (
    <>
    <Tabs 
    tabBar={(props) => <SerphintTabBar {...props} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} currentHint={currentHint} setOpenProductBrand={setOpenProductBrand} />}
        screenOptions={{ 
        tabBarActiveTintColor: 'blue',
        headerShown: false,
        }}
        
   
        
        >
    <Tabs.Screen
        name="Profile"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          
        }}
        
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Serphint',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="CameraLayout"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>


    {currentIndex === 2 && (
      openProductBrand && <CreateProductBrandView setOpenProductBrand={setOpenProductBrand} />
    )}


{currentIndex === 1 && (
    <>
<View style={{zIndex: 100}}>

<ActionView 
currentHint={currentHint} 
productSheetRef={productSheetRef} 
productSheetPosition={derivedBottomSheetPosition}
setShowBrandMenu={setShowBrandMenu}
showBrandMenu={showBrandMenu}
/>
</View>


<Animated.View
  style={[
    {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: width,
      zIndex: 10,
      backgroundColor: 'white',
    },
    brandMenuAnimatedStyle,
  ]}
>
  <BrandMenu 
  currentHint={currentHint}

  />
</Animated.View>

<BottomSheet
                ref={productSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                onChange={handleSheetChange}
                
                style={{backgroundColor: 'transparent', zIndex: 0}}
                enablePanDownToClose={true}
                // handleStyle={{backgroundColor: 'red', marginTop: insets.top}}
                // handleIndicatorStyle={{backgroundColor: 'black'}}
                handleComponent={() => {
                  return (
                    <View style={{backgroundColor: 'transparent', height: 0, width: '100%', zIndex: 0}}>
                      <View style={{backgroundColor: 'black', height: 3, width: 50, borderRadius: 99, alignSelf: 'center', marginTop: insets.top}}></View>
                    </View>
                  )
                }}
                animatedPosition={bottomSheetPosition}
              

            >
                <BottomSheetScrollView 
                
                contentContainerStyle={styles.contentContainer}>
                  <Product
                    item={currentHint}
                 
                  />
                </BottomSheetScrollView>
</BottomSheet>




</>

)}
</>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
   
        backgroundColor: 'transparent',
    },
   
});