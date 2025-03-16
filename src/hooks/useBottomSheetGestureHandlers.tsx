import { useCallback } from 'react';
import { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * Custom hook for handling gesture events in a Gorhom React Native Bottom Sheet
 * 
 * @param {Object} options - Configuration options for gesture handlers
 * @param {Function} options.onStart - Callback for when gesture starts
 * @param {Function} options.onChange - Callback for when gesture position changes
 * @param {Function} options.onEnd - Callback for when gesture ends
 * @param {Function} options.onFail - Callback for when gesture fails
 * @param {Function} options.onFinish - Callback for when entire gesture recognition is finished
 * @param {Function} options.onTouchesDown - Callback for when screen is touched
 * @param {Function} options.onTouchesMove - Callback for when touch position changes
 * @param {Function} options.onTouchesUp - Callback for when touch ends
 * @param {Function} options.onTouchesCancelled - Callback for when touch is cancelled
 * @returns {Object} Object containing the gesture handlers
 */
const useBottomSheetGestureHandlers = ({
  onStart,
  onChange,
  onEnd,
  onFail,
  onFinish,
  onTouchesDown,
  onTouchesMove,
  onTouchesUp,
  onTouchesCancelled,
} = {}) => {
  // Create a shared value to track the current Y position
  const currentPositionY = useSharedValue(0);
  
  // Create the animated gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // Store initial position
      context.startY = event.translationY;
      
      if (onStart) {
        onStart(event, context);
      }
    },
    onChange: (event, context) => {
      // Update the current position shared value
      currentPositionY.value = event.translationY;
      
      if (onChange) {
        onChange(event, context);
      }
    },
    onEnd: (event, context) => {
      if (onEnd) {
        onEnd(event, context);
      }
    },
    onFail: (event, context) => {
      if (onFail) {
        onFail(event, context);
      }
    },
    onFinish: (event, context) => {
      if (onFinish) {
        onFinish(event, context);
      }
    },
  });

  // Create touch handlers
  const handleTouchesDown = useCallback(
    (e) => {
      if (onTouchesDown) {
        onTouchesDown(e);
      }
    },
    [onTouchesDown]
  );

  const handleTouchesMove = useCallback(
    (e) => {
      if (onTouchesMove) {
        onTouchesMove(e);
      }
    },
    [onTouchesMove]
  );

  const handleTouchesUp = useCallback(
    (e) => {
      if (onTouchesUp) {
        onTouchesUp(e);
      }
    },
    [onTouchesUp]
  );

  const handleTouchesCancelled = useCallback(
    (e) => {
      if (onTouchesCancelled) {
        onTouchesCancelled(e);
      }
    },
    [onTouchesCancelled]
  );

  // Return all handlers and position tracking value
  return {
    gestureHandler,
    touchHandlers: {
      onTouchesDown: handleTouchesDown,
      onTouchesMove: handleTouchesMove,
      onTouchesUp: handleTouchesUp,
      onTouchesCancelled: handleTouchesCancelled,
    },
    // Expose the current position for tracking and debugging
    currentPositionY,
  };
};

export default useBottomSheetGestureHandlers;