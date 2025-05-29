import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function TabBar({ state, descriptors, navigation, onTabChange }) {
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
              if (onTabChange) {
                onTabChange(route.name); // notify parent of tab change
              }
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.focusedTab]}
            >
              <Text style={isFocused ? styles.focusedText : styles.text}>
                {label === 'Options' ? (
                  <SimpleLineIcons name="options" size={21} color="black" />
                ) : (
                  label
                )}
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
    paddingTop: 24,
    paddingBottom: 8,
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 12,
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