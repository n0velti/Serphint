import React, {useMemo, useRef, useCallback,useState, useEffect, forwardRef} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
// Import the components directly from their correct paths
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {ProductData} from '../../types/types';

import Animated, {useAnimatedStyle, interpolate, useSharedValue, useAnimatedScrollHandler, useDerivedValue, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, Pressable } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

import { Feather, MaterialCommunityIcons, Ionicons, AntDesign} from '@expo/vector-icons';



interface BrandMenuProps {

  currentHint: ProductData;
  scrollRef: any;
  panRef: any;
}

const {width, height} = Dimensions.get('window');
const BANNER_HEIGHT = height * 0.62;


function BrandMenu(props: BrandMenuProps) {
    const { currentHint, scrollRef, panRef } = props;
    const insets = useSafeAreaInsets();

    const AnimatedCoverImage = Animated.createAnimatedComponent(ImageBackground);
    const AnimatedFlatlist = Animated.createAnimatedComponent(BottomSheetFlatList);
    const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);
    
    // Create refs without TypeScript generic type annotations
    const sheetRef = useRef(null);
    const flatListRef = useRef(null);
    const scrollOffset = useSharedValue(0);

    const bottomSheetPosition = useSharedValue(0);


    const [debugPosition, setDebugPosition] = useState(0);

    const derivedBottomSheetPosition = useDerivedValue(() => {
      console.log('bottomSheetPosition.value', bottomSheetPosition.value);
      return bottomSheetPosition.value; // Keeps updates on UI thread

    }, [bottomSheetPosition]);
    const snapPoints = useMemo(() => [height * 0.12, height * 1], []);

 
const animatedMenuContainer = useAnimatedStyle(() => {
  return {
      opacity: interpolate(
          derivedBottomSheetPosition.value,
          [snapPoints[0], snapPoints[1]/1.2],
          [1, 0],
      ),
  }});


  const animatedBuyContainer = useAnimatedStyle(() => {
    return {
        opacity: interpolate(
            derivedBottomSheetPosition.value,
            [0, height/1.2],
            [0, 1],
        ),
    }});

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollOffset.value = event.contentOffset.y;
      
        
      }
  });

   // Function to track BottomSheet position
   const handleAnimate = (fromIndex: number, toIndex: number) => {
    console.log(`BottomSheet moved from index ${fromIndex} to ${toIndex}`);
};

const handleBuyProduct = () => {
  console.log('Buy Product');
}

   
    useEffect(() => {
      console.log('bottomSheetPosition', bottomSheetPosition);
    }, [bottomSheetPosition]);

    
    const animatedImageHeader = useAnimatedStyle(() => {
      return {
          transform: [
              {
                  translateY: interpolate(
                      scrollOffset.value,
                      [-BANNER_HEIGHT, 0 , BANNER_HEIGHT],
                      [-BANNER_HEIGHT / 2, 0 , BANNER_HEIGHT * 0.75],
                      
                  )
              },
              {
                  scale: interpolate(
                      scrollOffset.value,
                      [-BANNER_HEIGHT, 0 , BANNER_HEIGHT],
                      [2, 1, 1],
                  )
              }
          ]    
      }
  });


  const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
          opacity: interpolate(
              scrollOffset.value,
              [0, BANNER_HEIGHT / 2 ],
              [0, 1],
          )
      }
  });

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

  

    // render
    const renderMenuItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );



    const headerComponent = () => {
      return (
          <View style={styles.headerContainer}>

              <AnimatedPressable style={[styles.buyContainer, animatedBuyContainer]} onPress={handleBuyProduct}>
              <View style={styles.headerTitle}>
                        <Text style={styles.headerProductTitle}>{currentHint.product.productTitle}</Text>

                        <View style={styles.productPrice}>
                            <Text style={styles.productDollar}>$ {currentHint.product.productDollarPrice}</Text>
                            <Text style={styles.productCent}>{currentHint.product.productCentPrice}</Text>
                        </View>
                </View>   

                <Text style={styles.headerProductBrand}>{currentHint.product.productBrandTitle}</Text>
            
              </AnimatedPressable>

              <Animated.View style={[styles.headerContainer, animatedMenuContainer]}>
                  <AnimatedCoverImage style={[styles.coverHeader, animatedImageHeader]}
                      source={{ uri: 'https://picsum.photos/200/300' }}
                  >
                    <BlurView intensity={10} style={styles.coverHeader}/>
                    <Image
                      source={{ uri: currentHint.brand.brandLogo}}
                      style={styles.brandLogo}
                    />
                  </AnimatedCoverImage>

                  <View style={styles.footer}>
                    <View style={styles.topFooter}>
                      <Text style={styles.headerTitle}>{currentHint.brand.brandName}</Text>
                      <AntDesign name="infocirlce" size={16} color="white" />
                    </View>
                    <Text style={styles.description} numberOfLines={2}>{currentHint.brand.brandDescription}</Text>
                    <View style={styles.bottomFooter}>

                    <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionIconContainer}>
                    <Feather name="bar-chart-2" size={20} color="white" />
                    </View>
                    <Text style={styles.actionText}>45k</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionIconContainer}>
                      <MaterialCommunityIcons name="lightbulb-group-outline" size={24} color="white" />
                    </View>
                    <Text style={styles.actionText}>2.4k</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionIconContainer}>
                    <Ionicons name="heart-outline" size={20} color="white" />
                    </View>
                    <Text style={styles.actionText}>31k</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <View style={styles.actionIconContainer}>
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
                    </View>
                    <Text style={styles.actionText}>4.4k</Text>
                  </TouchableOpacity>
                    </View>
                  </View>
              </Animated.View>
                          
          </View>
      );
  }



    // Ensure we're rendering the component no matter what
    // This helps debug if there's an issue with the bottom sheet
    return (
        <GestureHandlerRootView style={styles.container} 
        pointerEvents='box-none'
        >
            <BottomSheet
                ref={sheetRef}
                index={0} 
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                enablePanDownToClose={false}
                onChange={handleSheetChange}
                backgroundStyle={styles.bottomSheet}
                handleComponent={null}
                simultaneousHandlers={scrollRef}
                onAnimate={handleAnimate}
                animatedPosition={bottomSheetPosition}
            >

                <AnimatedFlatlist
                    ref={flatListRef}
                    data={data}
                    keyExtractor={(i) => i}
                    renderItem={renderMenuItem}
                    contentContainerStyle={styles.contentContainer}
                    scrollEventsHandlersHook={scrollHandler}
                    
                   ListHeaderComponent={headerComponent}
                   showsVerticalScrollIndicator={false}
                />
                
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

export default BrandMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,

    },
    headerContainer: {
      overflow: 'hidden',
 
      backgroundColor: 'transparent',
              height: BANNER_HEIGHT,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverHeader: {
        width: width,
        height: BANNER_HEIGHT,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomSheet: {
        backgroundColor: "transparent",
        
        overflow: 'hidden',

    },
   
    contentHeader: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E6ECF1",
    },
   
    itemContainer: {
        padding: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#E6ECF1",
    },
    indicator: {
        backgroundColor: "white",
        width: 40,
    },
    brandLogo: {
      width: 100,
      height: 100,
      borderRadius: 14,
      resizeMode: 'contain',
      left: width / 2 - 50,
      top: BANNER_HEIGHT / 2 - 50,
      backgroundColor: 'white',
      
    },
    footer: {
      padding: 16,

      width: width,
      position: 'absolute',
      bottom: 0,
      gap: 15,
    },
    description: {
      fontSize: 16,
      color: 'lightgray',
    },

    topFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomFooter: {
      flexDirection: 'row',
   
      alignItems: 'center',
    },
    actionButton: {
      alignItems: 'center',
     
      flexDirection: 'row',
      gap: 4,
      marginRight: 20,
    },
    actionText: {
      color: 'white',
      fontSize: 12,
    },
    contentContainer: {
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },
  
    buyContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      marginVertical: 20,
      marginHorizontal: 20,
      padding: 10,
      backgroundColor: 'white',
      zIndex:99999,
       // iOS shadow properties
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 0,
       },
       shadowOpacity: 0.25,
       shadowRadius: 5.84,
       // Android shadow property
       elevation: 5,
       borderRadius: 17,
       overflow: 'visible',
      
    },
    menuContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    getProductContainer: {
      position: 'absolute',
      bottom: 0,
      width: width,

      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: 'rgba(200, 200, 200, 1)',    
      flexDirection: 'row',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
     
     
  },  
  getProductText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
  },
  productPrice: {
      flexDirection: 'row',
  
      gap: 2,

  },
  productDollar: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
  },
  productCent: {
      fontSize: 12,
      color: 'black',
      fontWeight: 'bold',
  },
  rightSide: {    
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  productMenu: {
      padding: 10,
      backgroundColor: 'black',
      borderRadius: 14,
  },
  viewMenuText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
  },
  getProduct: {
      padding: 10,
      backgroundColor: 'red',
      borderRadius: 14,
  },
  getText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
  },
  headerTitle: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

  },
  headerProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
},
headerProductBrand: {
    fontSize: 14,
    color: 'gray',
},
});