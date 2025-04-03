import React, {useEffect, useRef, useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ProductData } from '../../../types/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { useNavigation, useRouter} from 'expo-router';
import Video, {VideoRef} from 'react-native-video';
import VideoItem from './VideoItem';

import * as Location from 'expo-location';

import {startLocationTracking} from '../../../hooks/Location/useLocationServices';

import { useHint } from '../../../hooks/useHint';


// Get device dimensions
const { width, height } = Dimensions.get('window');


interface HintItemProps {
  item: ProductData;
}



function HintItem({ item}: HintItemProps) {
  // Get the first image URL to use as background
  
  const insets = useSafeAreaInsets();
  const ITEM_HEIGHT = height;

  const [locationCoords, setLocationCoords] = useState<Location.LocationObject | null>(null);
  const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);

  //temp - eventualy set all current hint to zustand
  const setCurrentHint = useHint(state => state.setCurrentHint);
  setCurrentHint(item);

  const router = useRouter();


  useEffect(() => {
    startLocationTracking(setLocationCoords, setErrorMsg, setSubscription);
  }, []);

  useEffect(() => {
    if (!locationCoords) return; // Ensure locationCoords is set before calling reverse geocoding
  
    const getLocationDetails = async () => {
      try {
        const geocodedLocation = await Location.reverseGeocodeAsync({
          latitude: locationCoords.coords.latitude,
          longitude: locationCoords.coords.longitude,
        });
        setLocation(geocodedLocation[0]);
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
      }
    };
  
    getLocationDetails();
  }, [locationCoords]); // Runs whenever locationCoords changes



  console.log('item', item);


  const handleHeaderPress = () => { 
    console.log('Header Pressed');
    
  }

  const handleHintPress = () => {
    console.log('Hint Pressed');
  }




  return (
    <View style={[styles.container, {height: ITEM_HEIGHT}]}>
   
        <View style={styles.overlay} pointerEvents='box-none'>
          {/* Product Image in foreground */}
          <TouchableOpacity
            activeOpacity={1}
         
            onPress={handleHintPress}
            style={styles.hintPressable}
          >
            {item.hint.hintMedia[0].mediaType === 'image' ?
            <Image 
              source={{ uri: item.hint.hintMedia[0].mediaUrl }} 
              style={[styles.productImage, {height: ITEM_HEIGHT}]}
              resizeMode="cover"
            />
          :
            
              <VideoItem currentHint={item} ITEM_HEIGHT={ITEM_HEIGHT} />
           
          }

          </TouchableOpacity>
          

            <TouchableOpacity style={[styles.headerContainer, {paddingTop: insets.top + 30}]}
              onPress={handleHeaderPress}
            >
              <View style={styles.locationHeader}>
              <Text style={styles.headerLocationText}>{location?.city || "Loading..."}</Text>
              <Entypo name="chevron-down" size={24} color="white" />
              </View>
              <Text style={styles.headerBrandText}>{item.product.productBrandTitle}</Text>
            </TouchableOpacity>
        

            <View style={styles.actionsContainer}>
                        {/* product/topic */}


                        {/* <ProductPreview item={item}/> */}
                    


                        {/* dot - for go to start*/}

                        {/* <TouchableOpacity 
                        style={styles.startBeginningDotContainer}
                        onPress={() => console.log('Go to start')}
                        
                        >
                          <View style={styles.startBeginningDot}/>
                        </TouchableOpacity> */}

                        {/* vertical seek */}

                        {/* love - start only with love */}

              
              
              </View>
          
    
          
          {/* Product Information Section */}
          {/* <TouchableOpacity style={[styles.infoContainer, {bottom: insets.bottom}]}
            
          >
            <Image
              source={{ uri: item.user?.userAvatar }}
              style={styles.profileImage}
            />
            <View style={styles.centerArea}>
              <View style={styles.topArea}>
                
                <Text style={styles.title}>{item.hint.hintTitle}</Text>

                <View style={styles.rightSide}>
                <Text style={styles.lastBoughtText}>4 mins ago</Text>

                <Entypo name="chevron-right" size={24} color="white" />
                </View>

              </View>

              <View style={styles.bottomArea}>
                
                <Text style={styles.userTitleText}>{item.user?.firstName} {item.user?.lastName}</Text>
              </View>

            </View>

            
          
          </TouchableOpacity> */}
          
      
        </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
  

    position: 'relative',
  },

  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    
    
   
    
  },
  productImage: {
    width: '100%',

   

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
       overflow: 'visible',

  },
  hintPressable: {
    width: '100%',
    height: '100%',

  
    borderRadius: 20,


    
 

  },
  infoContainer: {
    position: 'absolute',
    flexDirection: 'row',
    padding: 5,
    width: width , // Leave space for action buttons
    paddingBottom: 20,
    justifyContent: 'center',
    marginBottom: 3,  
   

  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 8,

  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
   
  },
  userTitleText: {
    fontSize: 13,
    color: 'white',
  },
  lastBoughtText: { 
    fontSize: 13,
    color: 'white',
    marginRight: 10,
  },

  centerArea:{
    flexDirection: 'column',

    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white', // Bright green like TikTok
  
  },
  
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  


    
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  
  },
  bottomArea: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

    
  actionsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 130,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
  },
  
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 19,

  
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',

  


  },
  headerLocationText: {
    color: 'white',
    fontSize: 27,
    fontWeight: 'bold',
    marginRight: 5,
  },
  headerBrandText: {
    color: 'white',
    fontSize: 21,
  },

  startBeginningDotContainer: {
    width: 40,
    height: 40,
    marginTop: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',

  },

  startBeginningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 10,
  },



});

export default HintItem;