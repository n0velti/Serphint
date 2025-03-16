import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import Profile from './Profile';
import Product from './Product';
import Serphint from '.';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import MyTabBar from '../../src/components/native/MyTabBar';
import CameraLayout from './(Camera)/CameraLayout';




const Tab = createMaterialTopTabNavigator();


function NativeLayout(props: any) {
    const insets = useSafeAreaInsets();
    const [currentHint, setCurrentHint] = useState(null);
    const [isComingFromCamera, setIsComingFromCamera] = useState(false);
    const navigationRef = useRef(null);


    const [showHintCamera, setShowHintCamera] = useState(false);
    
    const screenProps = {
      setCurrentHint,
      currentHint,
     
    };

    const handleHintPress = () => { 
      setShowHintCamera(!showHintCamera);
    }

     // Custom navigation event listener
     const handleStateChange = (state) => {
      // Check if coming from Camera to index
      if (state && state.routes) {
        const currentRouteName = state.routes[state.index].name;

        console.log('currentRouteName', currentRouteName);

     
        
        if (currentRouteName === 'Camera') { // 3 is Camera's index
          setIsComingFromCamera(true);
        } else {
          setIsComingFromCamera(false);
        }
      }

    }

    // Custom swipe handler to prevent swiping from Product to Camera
    const handleSwipeStart = (e) => {
      if (navigationRef.current) {
        const state = navigationRef.current.getCurrentRoute();
        // If we're on Product screen and swiping right (which would lead to Camera)
        // then prevent the swipe
        if (state.name === 'Product' && e.translationX > 0) {
          e.preventDefault();
          return false;
        }
      }
      return true;
    };
  
    return (

      <SafeAreaProvider style={{paddingBottom: insets.bottom, backgroundColor: 'transparent'}}>
    
        <Tab.Navigator
          initialRouteName='index'
          tabBarPosition='bottom'
          tabBar={props => <MyTabBar 
            
            {...props} 
            showHintCamera={showHintCamera} 
            setShowHintCamera={setShowHintCamera}
        
            currentHint={currentHint} 
            />}
            screenOptions={({ route }) => ({
              animationEnabled: true,
              tabBarStyle: {
                display: 'none',
              },
              tabBarIndicatorStyle: {
                display: 'none'
              },
              // Customize swipe behavior based on route
              swipeEnabled: route.name !== 'Camera', 
              // Set custom swipe configuration
              gestureHandlerProps: {
                // This ensures the Camera screen is only accessible programmatically
                enabled: route.name !== 'Camera',
              },
            })}
          screenListeners={{
            state: (e) => handleStateChange(e.data.state),
          }}
        >

          
          <Tab.Screen name="Profile" 
            options={{
              tabBarShowLabel: false,
            }}
          >
            {(props) => <Profile {...props}/>}
          </Tab.Screen>
  
          <Tab.Screen name="index"
            options={{
              tabBarShowLabel: false,
              animationEnabled: !isComingFromCamera, // Disable animation when coming from Camera

            }}
          >
            {(props) => <Serphint {...props}{...screenProps} />}
          </Tab.Screen>
  
          <Tab.Screen name="Product"
            options={{
              tabBarShowLabel: false,
            }}
          >
            {(props) => <Product {...props}{...screenProps}/>}
          </Tab.Screen>

          <Tab.Screen 
            name="Camera"
            
            options={{
              tabBarShowLabel: false,
              // Hide this from the tab bar
              tabBarButton: () => null,
              // Disable animation
              animationEnabled: false,
              // THIS IS KEY: Disable swipe navigation for Camera
              swipeEnabled: false,
              // Ensure Camera is not part of the swipe sequence
              detachPreviousScreen: false,
              gestureEnabled: false,
            }}
          >
            {(props) => <CameraLayout {...props} />}
          </Tab.Screen>


        </Tab.Navigator>

   

  
     
      </SafeAreaProvider>
    );
  }

export default NativeLayout;

const styles = StyleSheet.create({
    hintButtonContainer: {  
        position: 'absolute',

        bottom: 0,
        right: 0,
        height: 60,
        width: '50%',
        justifyContent: 'center',

        backgroundColor: 'transparent',

        
        alignItems: 'flex-end',
        
    },

    hintButton: {
        
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 14,
        width: 84,
        alignItems: 'center',
    },
    hintButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    }
})