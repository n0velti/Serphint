import React, {useEffect} from "react";
import { View, StyleSheet, Text, Dimensions} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  isLoading: boolean;
  isUISeeking: boolean;
  videoSeek: (arg0: number) => void;

}

const {width, height} = Dimensions.get('window');

const SeekBar: React.FC<SeekBarProps> = ({ currentTime, duration, isLoading, isUISeeking, videoSeek}) => {
  const progress = useSharedValue(currentTime / duration); // Normalized between 0 and 1

  // Update progress when video plays
  useEffect(() => {
    progress.value = withTiming(currentTime / duration, { duration: 200 });
   // console.log('progress.value', progress.value);
  }, [currentTime, duration]);

  // Gesture for user seeking
  const panGesture = Gesture.Pan()
    .onStart(() => {
      console.log('onStart');
    })
    .onChange((event) => {
      let newProgress = Math.max(0, Math.min((event.translationX + progress.value * width) / width, 1));
      progress.value = newProgress; // Update UI
    })
    .onEnd(() => {
      console.log('onEnd');
     // videoSeek(progress.value * duration);
    });

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
    }));

  return (
    <GestureHandlerRootView pointerEvents='none'>

    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
        <Text style={styles.timeText}>{Math.floor(currentTime)} / {Math.floor(duration)} sec</Text>
      </View>
    </GestureDetector>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {

    alignContent: "center",
    
    alignSelf: "center",
    width: width /1.3,
    height: 3,
    borderRadius: 99,
    backgroundColor: "#ddd",
 
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "red",
  },
  timeText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
});

export default SeekBar;