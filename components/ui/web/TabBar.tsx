// components/TabBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.focusedTab]}
          >
            <Text style={isFocused ? styles.focusedText : styles.text}>
                {
                    label === 'Options' ? (
                            <SimpleLineIcons name="options" size={21} color="black" />
                    ) : (
                        <Text style={{ fontSize: 16 }}>
                            {label}
                        </Text>
                    )
                }
       
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    
      backgroundColor: '#fff',
  
    },
    tabContainer: {
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
 
  
      // ✨ Key changes:
      margin: 20,
      alignSelf: 'flex-start',  
      alignItems: 'center',
      gap: 12, // optional, adds spacing between buttons (RN 0.71+)
    },
    tabItem: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    focusedTab: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    text: {
      color: '#333',
    },
    focusedText: {
      color: 'blue',
 
    },
  });
