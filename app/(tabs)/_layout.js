import React, { useEffect, useState, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Library from './library';
import HomeScreen from '.';
import Post from './post';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const Tab = createMaterialTopTabNavigator();

const TabIcon = ({ source, color }) => (
  <View style={styles.iconContainer}>
    <Image
      style={{ width: 22, height: 22, tintColor: color }}
      source={source}
    />
  </View>
);

export default function TabLayout() {
  const insets = useSafeAreaInsets(); 
  const [currentTab, setCurrentTab] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={currentTab === 0 ? "library" : currentTab === 1 ? "index" : "post"}
        screenOptions={({ route, navigation }) => ({  // Add navigation here
          tabBarStyle: {
            backgroundColor: 'transparent',
            bottom: 0,
            position: 'absolute',
            flex: 1,
            marginBottom: 21,
            width: '100%',
            alignSelf: 'center',
            display: route.params?.hasCapture ? 'none' : 'flex',  // Check route.params directly
          },
          tabBarActiveTintColor: '#ea1418',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { display: 'none' },
          tabBarShowIcon: true,
        })}
        tabBarPosition='bottom'
      >
        <Tab.Screen
          name="library"
          component={Library}
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => (
              <TabIcon 
                key="library-icon"
                source={require('../../assets/images/profile-user.png')}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="index"
          component={HomeScreen}
          options={{
            title: 'Serphint',
            tabBarIcon: ({ color }) => (
              <TabIcon 
                key="home-icon"
                source={require('../../assets/images/home.png')}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="post"
          component={Post}
          options={{
            title: 'Post',
            tabBarIcon: ({ color }) => (
              <TabIcon 
                key="post-icon"
                source={require('../../assets/images/camera.png')}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});