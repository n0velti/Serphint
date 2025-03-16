// src/mocks/vision-camera-mock.js
// Mock implementation of VisionCamera for web
const noop = () => null;

// Create an empty object to mock the Camera component
const Camera = function() { return null; };

// Add static methods that are called in your code
Camera.getCameraPermissionStatus = () => 'not-determined';
Camera.getMicrophonePermissionStatus = () => 'not-determined';

// Export all the functions and components that are imported in your code
export { Camera };
export const useCameraDevice = noop;
export const useCameraFormat = noop;
export const useFrameProcessor = noop;
export const runAtTargetFps = noop;
export const useLocationPermission = noop;
export const useMicrophonePermission = noop;

// If you're using a default export somewhere
export default { Camera };