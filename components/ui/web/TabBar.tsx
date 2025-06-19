import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabBar({ state, descriptors, navigation, onTabChange }) {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Finasteride</Text>
        
        
        </View>
        

        <View style={styles.tabBar}>
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
                if (onTabChange) onTabChange(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={[styles.tabItem, isFocused && styles.tabItemActive]}
              >
                {label === 'Options' ? (
                  <SimpleLineIcons
                    name="options"
                    size={18}
                    color={isFocused ? '#111' : '#999'}
                  />
                ) : (
                  <Text style={isFocused ? styles.tabTextActive : styles.tabText}>
                    {label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
       
        </View>
      </View>
      <Text style={styles.subtitle}>
            Clinically proven to slow hair loss and promote regrowth in men.
      </Text>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
  <View style={styles.featuresContainer}>
    <View style={styles.featureItem}>
      <Text style={styles.inStockText}>In Stock</Text>
    </View>
    <Text style={styles.dot}>•</Text>
    <View style={styles.featureItem}>
      <FontAwesome5 name="shipping-fast" size={14} color="#666" />
      <Text style={styles.featureText}>Free Shipping</Text>
    </View>
    <Text style={styles.dot}>•</Text>
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>Cancel Free Anytime.</Text>
    </View>
    {/* <Text style={styles.dot}>•</Text>
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>Prescription Required</Text>
      <TouchableOpacity>
        <Text style={styles.linkText}> Get Rx</Text>
      </TouchableOpacity>
    </View> */}
  </View>

  <View style={styles.ctaContainer}>
    <Text style={styles.ctaInlineText}>
      Starting at <Text style={styles.ctaPrice}>$19.99/mo</Text>
    </Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('index')}
      style={styles.addToCardButton}
    >
      <Text style={styles.addToCardText}>Add to Cart</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('index')}
      style={styles.buyButton}
    >
      <Text style={styles.buyButtonText}>Subscribe</Text>
    </TouchableOpacity>
  </View>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 55,
    backgroundColor: '#fff',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
  },

  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  title: {
    fontSize: 29.5,
    fontWeight: '600',
    color: '#111',
  },

  subtitle: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.55)',
    fontWeight: '500',
    marginTop: 4,
  },

  tabBar: {
    flexDirection: 'row',
    gap: 14,
  },

  tabItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  tabItemActive: {
    borderBottomColor: '#111',
  },

  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
  },

  tabTextActive: {
    fontSize: 14,
    color: '#111',
    fontWeight: '400',
  },

  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },

  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  featureText: {
    fontSize: 12.5,
    color: '#444',
  },

  inStockText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#2a9d8f',
  },

  dot: {
    fontSize: 13,
    color: '#bbb',
  },

  linkText: {
    fontSize: 12.5,
    color: '#007AFF',
    fontWeight: '500',
  },

  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },

  ctaInlineText: {
    fontSize: 13,
    color: '#333',
  },

  ctaPrice: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#000',
  },

  addToCardButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },

  addToCardText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },

  buyButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});