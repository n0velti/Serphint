import React, { useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

const HoverableButton = ({ label }: { label: string }) => {
  const anim = useRef(new Animated.Value(0)).current;

  const handleMouseEnter = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleMouseLeave = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#ddd'],
  });

  return (
    <Pressable onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Animated.View style={{ backgroundColor, padding: 10, borderRadius: 6 }}>
        <Text>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};
export default HoverableButton;