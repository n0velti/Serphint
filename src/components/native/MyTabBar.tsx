import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome6, Entypo } from '@expo/vector-icons';
import {ProductData} from '../../types/types';
import { BlurView } from 'expo-blur';

import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

interface MyTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  showHintCamera: boolean;
  setShowHintCamera: (value: boolean) => void;

  currentHint: ProductData; // Explicitly typing currentHint as ProductData
}
function MyTabBar({ state, descriptors, navigation, showHintCamera, setShowHintCamera,currentHint}: MyTabBarProps) {

  const handleHintPress = () => {
    setShowHintCamera(!showHintCamera);
    //navigation.navigate('Camera', {}, { animation: 'none' });
  }


  return (
    <BlurView intensity={5} style={styles.tabContainer}>

      <View style={styles.navigationButtons}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

          // Skip rendering the Camera tab in the tab bar
          if (route.name === 'Camera') {
            return null;
          }

        const onPress = () => {

          console.log('onPress', route.name);
          console.log('route key', route.key);

            // Special handling for the index tab
            if (route.name === 'index' && isFocused) {
              // If already on index tab, navigate to Camera with no animation
              navigation.navigate('Camera', {}, { animation: 'none' });
              return;
            }

            if(route.name === 'Product' && isFocused) {
              console.log('product');
       
              return;
            }

            console.log('onPress', route.name);
            // Special handling for the index tab
            if (route.name === 'index' && !isFocused) {
              // If already on index tab, navigate to Camera with no animation
              console.log('Camera');
              navigation.navigate('index', {}, { animation: 'none' });
              return;
            }



          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Render the icon based on the route name
        let icon;
        if (route.name === 'Profile') {
          icon = <FontAwesome6 name="face-smile-beam" size={20} color={isFocused ? 'red' : 'black'} />;
        } else if (route.name === 'index') {
          icon = <Entypo name="light-up" size={20} color={isFocused ? 'red' : 'black'} />;
        } else if (route.name === 'Product') {
          icon = <Image
            source={{ uri: currentHint?.brand?.brandLogo}}
            style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center' }}
          />;
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? '#ddd' : 'transparent' }
            ]}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
      </View>

      <View style={styles.actionButton}>

          <TouchableOpacity style={styles.hintButton} onPress={handleHintPress}>
            <Text style={styles.hintButtonText}>{showHintCamera ? 'Close' : 'Hint'}</Text>
          </TouchableOpacity>


        </View>
    </BlurView>
  );
}



const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    elevation: 2,
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 999,
  },
  navigationButtons: {
    flexDirection: 'row',
    width: '40%',
  },
  actionButton: {
    marginEnd: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  hintButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hintButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
});

export default MyTabBar;