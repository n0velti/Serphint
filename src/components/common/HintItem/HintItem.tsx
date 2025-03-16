import React, {useRef} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ProductData } from '../../../types/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import VideoItem from './VideoItem';

// Get device dimensions
const { width, height } = Dimensions.get('window');


interface HintItemProps {
  item: ProductData;
}



function HintItem({ item }: HintItemProps) {
  // Get the first image URL to use as background
  
  const insets = useSafeAreaInsets();
  const ITEM_HEIGHT = height - insets.bottom;

  console.log('HintItem', item);

  const navigation = useNavigation();

  const videoRef = useRef<VideoRef>(null);




  return (
    <View style={[styles.container, {height: ITEM_HEIGHT}]}>
   
        <View style={styles.overlay} pointerEvents='box-none'>
          {/* Product Image in foreground */}
          <TouchableOpacity
            activeOpacity={1}
         
            onPress={() => navigation.navigate('Product')}
            style={styles.hintPressable}
          >
            <TouchableWithoutFeedback>
            {item.hint.hintMedia[0].mediaType === 'image' ?
            <Image 
              source={{ uri: item.hint.hintMedia[0].mediaUrl }} 
              style={[styles.productImage, {height: ITEM_HEIGHT * 0.92}]}
              resizeMode="cover"
            />
          :
        //  item.hint.hintMedia[0].mediaType === 'video' 
            
              <VideoItem currentHint={item} ITEM_HEIGHT={ITEM_HEIGHT} />
           
          }
                   </TouchableWithoutFeedback>

          </TouchableOpacity>
          

            <View style={[styles.headerContainer, {paddingTop: insets.top + 30}]}>
              <View style={styles.locationHeader}>
                <Text style={styles.headerLocationText}>Montreal</Text>
                <Entypo name="chevron-down" size={24} color="white" />
              </View>
              <Text style={styles.headerBrandText}>{item.product.productBrandTitle}</Text>
            </View>
        
         
          {/* Action Buttons (similar to TikTok) */}
          {/* <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>❤️</Text>
              </View>
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>💬</Text>
              </View>
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>🔖</Text>
              </View>
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>↗️</Text>
              </View>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View> */}
          
          {/* Product Information Section */}
          <TouchableOpacity style={[styles.infoContainer, {bottom: ITEM_HEIGHT * 0.12 - 40}]}
            
          onPress={() => navigation.navigate('Product')}
          >
            <Image
              source={{ uri: item.user?.userAvatar }}
              style={styles.profileImage}
            />
            <View style={styles.centerArea}>
              <View style={styles.topArea}>
                
                <Text style={styles.title}>{item.hint.hintTitle}</Text>

                <View style={styles.rightSide}>
                <Text style={styles.price}>${item.product.productDollarPrice}.{item.product.productCentPrice}</Text>
                <Entypo name="chevron-right" size={24} color="white" />
                </View>

              </View>

              <View style={styles.bottomArea}>
                
                <Text style={styles.userTitleText}>{item.user?.firstName} {item.user?.lastName}</Text>
                <Text style={styles.lastBoughtText}>4 mins ago</Text>
              </View>

            </View>

            
          
          </TouchableOpacity>
          
      
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
    bottom: 100,
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



});

export default HintItem;