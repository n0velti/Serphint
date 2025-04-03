import React, {useRef, useCallback, useMemo, useEffect} from "react";
import { View, Image, Animated, Dimensions, Text, TouchableOpacity, StyleSheet, FlatList, Platform, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { ProductData } from "../../../types/types";
import { AntDesign } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");




type RootStackParamList = {
    Product: { item: ProductData };  // Ensure "Product" matches the screen name
};

export type ProductScreenRouteProp = RouteProp<RootStackParamList, "Product">;

const ITEM_WIDTH = width * 0.65;
const ITEM_HEIGHT = (ITEM_WIDTH * 19.5) / 9; // Keep 16:9 aspect ratio
const SPACING = 5;


type ProductProps = {
    item: ProductData;
};

export default function Product({item}: ProductProps) {

    console.log(item);

    const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const route = useRoute<ProductScreenRouteProp>();

      const flatListRef = useRef<FlatList>(null);
            const scrollX = useRef(new Animated.Value(0)).current;
            const currentIndex = useRef(0);

         



    const handleMomentumScrollEnd = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / (ITEM_WIDTH + SPACING));

    

        if (newIndex !== currentIndex.current) {
            currentIndex.current = newIndex;
            flatListRef.current?.scrollToOffset({
                offset: newIndex * (ITEM_WIDTH + SPACING),
                animated: true,
            });
        }
    };

      

  return (
    
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: insets.top }}>

    

        <View style={styles.header}>

          


            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item?.product?.productTitle}</Text>
                <Text style={styles.brandTitle}>{item?.product?.productBrandTitle}</Text>
            </View>


            <View style={styles.headerButtons}>
                {/* <TouchableOpacity style={styles.menuButton} onPress={() => console.log("menu")}>
                    <Ionicons name="menu" size={14} color="black" />
                    <Text style={styles.menuText}>Menu</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.optionsButton}>
                    <SimpleLineIcons name="options" size={14} color="black" />
                </TouchableOpacity>
            </View>

        </View>


        <View style={styles.flatListContainer}>  


        <FlatList
                ref={flatListRef}
                data={item?.product.productMedia}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.imgContainer}>
                        <Image source={{ uri: item?.mediaUrl }} style={styles.image} />
                        </View>
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleMomentumScrollEnd} // Strict snapping
                style={{ paddingLeft: SPACING*2 }}
            />

        </View>
        


        

        <View style={styles.descriptionContainer}>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.descriptionText}>{item?.hint.hintDescription}</Text>

        </View>

        



        </View>
     
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    header:{
        flexDirection: 'row',
        gap: 20,
        paddingTop: 35,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    titleContainer:{
        flex: 1,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle:{
        fontSize: 22,
        color: 'gray',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },

    itemContainer: {
        marginHorizontal: SPACING,
        backgroundColor: 'transplant',
        padding: SPACING,
    },
    image:{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover',
        borderRadius: 25,
   

         // ✅ Cross-Platform Shadow
  
      

    },

    imgContainer:{
        borderRadius: 16,
        overflow: 'visible',
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

    brandLogoContainer:{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 10,

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
    brandLogo:{
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    brandTitle:{
        color: 'gray',
    },
    flatListContainer:{
        marginTop: 5,
        marginBottom: 10,
        gap: 10,
    },
    descriptionContainer:{
        padding: 20,
        gap: 10,
    },
    lineSeperator:{
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'lightgray',
        marginHorizontal: 20,
    },

    rightHeader:{
        flexDirection: 'column',
    
        flex: 1,
       
    },
    headerButtons:{
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
        
    },
    optionsButton:{
        borderWidth: 1,
        borderColor: 'lightgray',
     
        height: 32,
        width: 32,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton:{
        borderWidth: 1,
        borderColor: 'lightgray',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 13,
        gap: 5,
    },
    descriptionText:{
        color: 'gray',
    },
    menuText:{
        fontSize: 12,
    },

    getContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 7,
        paddingLeft: 15,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'lightgray',
        marginHorizontal: 20,
        borderRadius: 17,
        overflow: 'hidden',
      
        alignItems: 'center',
    },

    dollarText:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    getButton:{
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 13,
    },
    getButtonText:{
        color: 'white',
        fontWeight: 'bold',
    },

})