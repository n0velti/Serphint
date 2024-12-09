import React, { useState, useRef, forwardRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MediaFeed from './MediaFeed';
import { Image } from 'expo-image';
import SlideToUnlock from './SlideToUnlock';

const { width, height: WINDOW_HEIGHT } = Dimensions.get('window');

const MediaFeedWithRef = forwardRef((props, ref) => {
  return <MediaFeed {...props} ref={ref} />;
});

const ExpandableMediaFeed = (props) => {
  const mediaFeedRef = useRef(null);
  const lastPosition = useRef(0);
  
  const animatedValues = {
    mediaSize: useRef(new Animated.Value(1)).current,
    contentOpacity: useRef(new Animated.Value(0)).current,
    headerOpacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(0)).current,
  };

  const handleExpand = () => {
    const config = {
      duration: 300,
      useNativeDriver: true,
    };
  
    if (!props.isExpanded) {
      if (mediaFeedRef.current?.getCurrentIndex) {
        lastPosition.current = mediaFeedRef.current.getCurrentIndex();
      }
  
      Animated.parallel([
        Animated.timing(animatedValues.mediaSize, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues.contentOpacity, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(animatedValues.headerOpacity, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(animatedValues.translateY, {
          toValue: -WINDOW_HEIGHT * 0.18,
          ...config,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(animatedValues.mediaSize, {
          toValue: 0.6,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(animatedValues.mediaSize, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValues.contentOpacity, {
            toValue: 0,
            ...config,
          }),
          Animated.timing(animatedValues.headerOpacity, {
            toValue: 0,
            ...config,
          }),
          Animated.timing(animatedValues.translateY, {
            toValue: 0,
            ...config,
          }),
        ]),
      ]).start(() => {
        if (mediaFeedRef.current?.scrollToIndex) {
          mediaFeedRef.current.scrollToIndex({
            index: lastPosition.current,
            animated: false
          });
        }
      });
    }
    
    props.setIsExpanded(!props.isExpanded);
  };
  
  useEffect(() => {
    return () => {
      animatedValues.mediaSize.removeAllListeners();
    };
  }, []);

  const mediaStyle = {
    transform: [
      {
        scale: animatedValues.mediaSize,
      },
      {
        translateY: animatedValues.translateY,
      },
    ],
  };

  const renderHeader = () => {
    if (!props.isExpanded) return null;
    
    return (
      <Animated.View
        style={[
          styles.headerContent,
          { 
            opacity: animatedValues.headerOpacity,
            transform: [{
              translateY: animatedValues.headerOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              })
            }],
          }
        ]}
      >

<View style={styles.headerTop}>
  <TouchableOpacity onPress={handleExpand}>
    <AntDesign name="arrowleft" size={24} color="black" />
  </TouchableOpacity>

  <View style={styles.centerHeaderContainer}>
    <View style={styles.profileView}>
      <Image
        source={require('../assets/images/sampleProfilePic2.jpg')}
        style={styles.profilePic}
        contentFit='cover'
      />
      <Text style={styles.profileName}>Arlaine Bertrand</Text>
    </View>
    <View style={styles.locationContainer}>
      <Text style={styles.locationText}>Montreal</Text>
    </View>
  </View>

  {/* Add an empty View for spacing balance */}
  <View style={{ width: 24 }} />
</View>

      </Animated.View>
    );
  };

  const renderNowPlayingButton = () => {
    if (props.isExpanded) return null;

    return (
      <TouchableOpacity 
        style={styles.nowPlayingButton}
        onPress={handleExpand}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/images/sampleProfilePic2.jpg')}
          style={styles.profilePicBar}
          contentFit='cover'
        />
        <View style={styles.innerBarContainer}>
          <Text style={styles.profileNameBar}>Arlaine Bertrand</Text>
          <Text style={styles.purchasedProductNameBar}>Macbook Pro</Text>
        </View>
        <View style={styles.dollarFigureBar}>
          <Text style={styles.dollarFigureTextBar}>$ 1,299</Text>
          <Text style={styles.dollarFigureTextBarCent}>59</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.mediaContainer, mediaStyle]}>
          <MediaFeedWithRef 
            ref={mediaFeedRef} 
            scrollEnabled={!props.isExpanded}
          />
        </Animated.View>

        {props.isExpanded && (
          <Animated.View
            style={[
              styles.expandedContent,
              { 
                opacity: animatedValues.contentOpacity,
                transform: [{
                  translateY: animatedValues.contentOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  })
                }],
              }
            ]}
          >
            <View style={styles.expandedContentTitleArea}>
              <View style={styles.titleLeftSide}>

            
            <Text style={styles.productName}>Macbook Pro</Text>
            <Text style={styles.productBrand}>Apple</Text>
            </View>
            <View style={styles.titleRightSide}>
              <Text>$ 1,299.59</Text>
            </View>
            </View>
            <View style={styles.lineSeperator}/>
            
            <View style={styles.quickView}>
              <TouchableOpacity style={styles.quickViewItem}>
                <Text style={styles.quickViewTitle}>Activity</Text>
                <Text style={styles.quickViewValue}>7</Text>
              </TouchableOpacity>
              
              <View style={styles.verticalSeparator} />
              
              <TouchableOpacity style={styles.quickViewItem}>
                <Text style={styles.quickViewTitle}>Hint value</Text>
                <Text style={styles.quickViewValue}>5%</Text>
              </TouchableOpacity>
              
              <View style={styles.verticalSeparator} />
              
              <TouchableOpacity style={styles.quickViewItem}>
                <Text style={styles.quickViewTitle}>Menu</Text>
              </TouchableOpacity>
              
              <View style={styles.verticalSeparator} />
              
              <TouchableOpacity style={styles.quickViewItem}>
                <Text style={styles.quickViewBoldText}>Buy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.productDetails}>
              <Text style={styles.productDetailsTitle}>Product Details</Text>

              <Text>Apple M4 chip{'\n\n'}
                10-core CPU with 4 performance cores and 6 efficiency cores{'\n'}
                10-core GPU{'\n'}
                Hardware-accelerated ray tracing{'\n'}
                16-core Neural Engine{'\n'}
                120GB/s memory bandwidth
              </Text>
            </View>
            {/* Add padding for slider */}
            <View style={{ height: 100 }} />
          </Animated.View>
        )}
      </ScrollView>

      {/* Fixed slider
      {props.isExpanded && (
        <Animated.View
          style={[
            styles.sliderContainer,
            { opacity: animatedValues.contentOpacity }
          ]}
        >
          <SlideToUnlock />
        </Animated.View>
      )} */}

      {!props.isExpanded && renderNowPlayingButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  headerContent: {
    width: width,
    padding: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    marginTop: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  mediaContainer: {
    width: '100%',
    height: WINDOW_HEIGHT,
    backgroundColor: '#fff',
  },
  expandedContent: {
    width: width,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -(WINDOW_HEIGHT * 0.4),
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    marginBottom: 40,

  
  
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  productBrand: {
    fontSize: 21,
    color: '#333',
  },
  productDetails: {
    marginTop: 10,
  },
  lineSeperator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  nowPlayingButton: {
    position: 'absolute',
    bottom: 80,
    left: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 4,
    borderRadius: 15,
    width: width * 0.9,
    flexDirection: 'row',
    zIndex: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

  },
  profilePicBar: {
    width: 44,
    height: 44,
    borderRadius: 11,
    marginRight: 8,
  },
  innerBarContainer: {
    justifyContent: 'center',
    gap: 3,
  },
  profileNameBar: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  purchasedProductNameBar: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },
  dollarFigureBar: {
    borderRadius: 10,
    padding: 9,
    alignSelf: 'center',
    marginLeft: 'auto',
    
    flexDirection: 'row',
    gap: 2,
  },
  dollarFigureTextBar: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dollarFigureTextBarCent: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  expandedContentTitleArea:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  titleLeftSide:{
    justifyContent: 'center',
  },
  titleRightSide:{
    justifyContent: 'center',

  },
  quickView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  quickViewItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickViewTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  quickViewValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  quickViewBoldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  verticalSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  productDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centerHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8, // Adds space between profile pic and name
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
 
});

export default ExpandableMediaFeed;