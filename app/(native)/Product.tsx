import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductData } from '../../src/types/types';
import { FlashList } from '@shopify/flash-list';
import { Feather, MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import BrandMenu from '../../src/components/native/BrandMenu';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { BlurView } from 'expo-blur';
import { PanGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture';

const {width, height} = Dimensions.get('window');

interface SerphintProps {
    // Add any props you need
    route: any; 
    currentHint: ProductData;
    setCurrentHint: (hint: ProductData) => void;
  
  }
  
function Product(props: SerphintProps) {
    const { currentHint, } = props;
    const [isLoading, setIsLoading] = useState(true);

    const scrollRef = useRef(null);
    const panRef = useRef(null);

    // Effect to check if the hint is loaded
    useEffect(() => {
        if (currentHint && currentHint.product) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [currentHint]);

    const insets = useSafeAreaInsets();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.productMediaItem}>
            <Image source={{ uri: item.mediaUrl }} style={styles.productMedia} />
        </View>
    );

    // Render loading state
    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer, { paddingTop: insets.top }]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading product information...</Text>
            </View>
        );
    }

    // Safe access to product with optional chaining
    const { product, hint } = currentHint || {};

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView 
            style={[styles.container, {paddingTop: insets.top}]}
            scrollEventThrottle={16}
            
        

            >
               
           
                <View style={styles.productMediaContainer}>
                    <FlashList
                        data={product?.productMedia}
                        renderItem={renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        estimatedItemSize={width * 0.65}
                    />
                </View>
            
                <View style={styles.productButtonContainer}>
                    <View style={styles.productButton}>
                        <Feather name="bar-chart-2" size={20} color="black" />
                        <Text style={styles.productButtonCount}>44k</Text>
                    </View>
                    <View style={styles.productButton}>
                        <MaterialCommunityIcons name="lightbulb-group-outline" size={24} color="black" />
                        <Text style={styles.productButtonCount}>13k</Text>
                    </View>
                    <View style={styles.productButton}>
                        <Ionicons name="heart-outline" size={20} color="black" />
                        <Text style={styles.productButtonCount}>448k</Text>
                    </View>
                    <View style={styles.productButton}>
                        <FontAwesome6 name="commenting" size={20} color="black" />
                        <Text style={styles.productButtonCount}>6k</Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{hint?.hintDescription}</Text>
                </View>

                <View style={styles.locationContainer}>
                    <Text style={styles.locationTitle}>Location</Text>
                    <Text style={styles.locationDetails}>{product?.productLocation?.fullDisplayName}</Text>
                </View>

                <View style={{padding: insets.bottom + 20}}/>
            </ScrollView>
            
          

            {/* Pass the state and setter to BrandMenu */}
            <BrandMenu
               
                currentHint={currentHint}
                scrollRef={scrollRef}   
                panRef={panRef}
            />
        </GestureHandlerRootView>
      
    );
}

export default Product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
    },
    headerContainer: {
        marginTop: 15,
        paddingVertical: 15,
        flexDirection: 'column',
        
        
    },
    headerProductTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerProductBrand: {
        fontSize: 14,
        color: 'gray',
    },
    productMediaContainer: {
        height: height * 0.58,
        justifyContent: 'center',
    },
    productMediaItem: { 
        marginLeft: 20,
        marginRight: 5,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'lightgray',
        height: height * 0.55,
        width: width * 0.65,
        borderRadius: 14,
        overflow: 'visible',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        // iOS shadow properties
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        // Android shadow property
        elevation: 5,
    },
    productMedia: {
        width: width * 0.65,
        height: height * 0.55,
        borderRadius: 10,
    },
    productButtonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 18,
        marginLeft: 20,
    },
    productButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    productButtonCount: {
        marginLeft: 2,
        fontSize: 13,
    },
    descriptionContainer: { 
        padding: 20,
        gap: 10,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 16,
        color: 'gray',
    },
    locationContainer: {
        paddingHorizontal: 20,
        gap: 10,
    },
    locationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    locationDetails: {
        fontSize: 16,
        color: 'gray',
    },
    productCostContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    productCost: {
        fontSize: 17,
        fontWeight: 'bold',
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


});