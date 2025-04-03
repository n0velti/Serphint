import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image, TouchableOpacity } from 'react-native';
import { ProductData } from '../../../types/types';
import Animated, { useAnimatedStyle, interpolate, Extrapolate, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';

import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

type ActionViewProps = {
    currentHint: ProductData | undefined;
    productSheetRef: any;   
    productSheetPosition: any;
    setShowBrandMenu: any;
    showBrandMenu: boolean;
};

const {width, height} = Dimensions.get('window');

function ActionView({currentHint, productSheetRef, productSheetPosition, setShowBrandMenu, showBrandMenu}: ActionViewProps) {

    const handleActionPress = () => {
        console.log('Action Pressed');
        productSheetRef.current?.expand();
    };

    const router = useRouter();


    const [sheetState, setSheetSate] = useState<'START' | 'IN_PROGRESS' | 'END' | 'OPEN'>('OPEN');
  
  const onSheetStateChange = (state: 'START' | 'IN_PROGRESS' | 'END' | 'OPEN') => {
    console.log('Sheet state:', state);
    setSheetSate(state);
  };

  useAnimatedReaction(
    () => productSheetPosition.value,
    (current, previous) => {
      if (current === previous) return;
  
      // Just opened or closed completely
      if (current === 0) {
        runOnJS(onSheetStateChange)('OPEN');
      } else if (current === height) {
        runOnJS(onSheetStateChange)('END');
      } 
      // Started moving
      else if (previous === 0 || previous === 1) {
        runOnJS(onSheetStateChange)('START');
      } 
      // Still moving
      else {
        runOnJS(onSheetStateChange)('IN_PROGRESS');
      }
    }
  );

  const brandMenuPress = () => {
    console.log('Brand Menu Pressed');
    // router.push({
    //     pathname: '/BrandMenu',
    //     params: { currentHint: JSON.stringify(currentHint) }, // best to stringify if it's an object
    //   });
    setShowBrandMenu(!showBrandMenu);
  }

  // Animated Opacity for Serphint View (fades out as BottomSheet opens)
  const serphintAnimation = useAnimatedStyle(() => {
    return {
        opacity: interpolate(
            productSheetPosition.value, 
            [0, height],  // Map: When sheet is closed (0) → 1, When open (1) → 0
            [0, 1],  // Output: 1 → 0
            Extrapolate.CLAMP
        ),
    };
});

// Animated Opacity for Product View (fades in as BottomSheet opens)
const productAnimation = useAnimatedStyle(() => {
    return {
        opacity: interpolate(
            productSheetPosition.value, 
            [height,0],  // Map: When sheet is closed (0) → 0, When open (1) → 1
            [0, 1],  // Output: 0 → 1
            Extrapolate.CLAMP
        ),
        // transform: [{ scale: interpolate(productSheetPosition.value, [0, 1], [0.95, 1], Extrapolate.CLAMP) }],
    };
});

    return (
        <View>
        <TouchableOpacity onPress={handleActionPress} style={styles.actionPressButton} disabled={sheetState === 'OPEN' || sheetState === 'IN_PROGRESS'} activeOpacity={0.5}>
        <View style={styles.container}>
            <BlurView intensity={10} style={StyleSheet.absoluteFill} />

            <Animated.View style={[{flexDirection: 'row', width: '100%'}, serphintAnimation]}>
                <Image source={{uri: currentHint?.user?.userAvatar}} style={styles.userAvatar} />

                <View style={styles.titleArea}>
                    <Text style={styles.productName}>{currentHint?.product.productTitle}</Text>
                    <Text style={styles.userName}>{currentHint?.user?.firstName +' '+ currentHint?.user?.lastName}</Text>
                </View>

                <View style={styles.costArea}>
                    {/* <Text style={styles.dollarFigure}>$ {currentHint?.product.productDollarPrice}</Text>
                    <Text style={styles.centsFigure}>{currentHint?.product.productCentPrice}</Text> */}
                    
                    <Text style={styles.timePosted}>4 mins ago</Text>
                </View>

            </Animated.View>

            <Animated.View style={[{flexDirection: 'row', width: '100%', position: 'absolute',justifyContent: 'space-between',
                display: sheetState === 'END' ? 'none' : 'flex',
                marginVertical: 10,
                

            }, productAnimation]}>
                <View style={styles.costArea}>
                <TouchableOpacity style={styles.getButton}>
                     
                </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.menuButton} onPress={brandMenuPress}>
                    <Ionicons name="menu" size={14} color="black" />
                        <Text style={styles.menuText}>Menu</Text>
                    </TouchableOpacity>

                
                </View>
                

            </Animated.View>

                

            {/* <Animated.View style={[styles.container]}>
                    <Text>HELLO</Text>
            </Animated.View> */}

                


            
        </View>
        </TouchableOpacity>


        </View>

    );
}

export default ActionView;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 100,
 
        borderRadius: 99,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',

        flexDirection: 'row',
        padding: 6,
        zIndex: 20,
    },
    titleArea: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    costArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 13,
    },
    dollarFigure: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    centsFigure: {
        fontSize: 13,
    },

    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 99,
    },
    actionPressButton: {
        ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            },
            android: {
              elevation: 5, // Android only
            },
            default: {
              // ✅ Web Shadow
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            },
          }),
    
    },



    productDollarFigure: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    productCentsFigure: {
        fontSize: 13,
    },


    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },


    menuButton: {   
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 8,
     
        backgroundColor: 'transparent',
    },
    menuText: {
        fontSize: 12,
        marginLeft: 5,
    },
    getButton: {
        backgroundColor: 'red',
        width: 55,
        height: 35,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
     
        

    },
    getText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',

    },


});