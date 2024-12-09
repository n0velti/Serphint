import React, { useState, useRef } from 'react';
import { View, Text, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SlideToUnlock = () => {
  const [slideComplete, setSlideComplete] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  
  const SLIDER_BUTTON_WIDTH = 65;
  const CONTAINER_WIDTH = width * 0.95;
  const maxSlide = CONTAINER_WIDTH - SLIDER_BUTTON_WIDTH;

  const restrictToSliderArea = (value) => {
    return Math.min(Math.max(value, 0), maxSlide);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newPosition = restrictToSliderArea(gestureState.dx);
      pan.setValue(newPosition);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const finalPosition = restrictToSliderArea(gestureState.dx);
      
      if (finalPosition >= maxSlide - 5) {
        setSlideComplete(true);
        console.log('Unlocked!');
      } else {
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.sliderContainer, { width: CONTAINER_WIDTH }]}>
        <Text style={styles.backgroundText}>
          slide to purchase
        </Text>
        
        <Animated.View
          style={[
            styles.slider,
            { 
              transform: [{ translateX: pan }],
              width: SLIDER_BUTTON_WIDTH,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.sliderText}>→</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: 70,
    backgroundColor: '#ccc',
    borderRadius: 35, // Half of height for perfect circle ends
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundText: {
    color: '#888',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  slider: {
    height: 65,
    backgroundColor: 'red',
    borderRadius: 32.5, // Half of height for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 2.5, // Small padding from the edge
  },
  sliderText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SlideToUnlock;