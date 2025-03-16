export default {
    scheme: 'Serphint',
    web: {
      bundler: 'metro',
    },
    "android": {
      "package": "com.eanuichi.serphint"
    },
    "ios": {
      "bundleIdentifier": "com.eanuichi.serphint",
      "infoPlist": {
        "NSCameraUsageDescription": "Serphint needs access to your camera to create visual hints",
        "NSMicrophoneUsageDescription": "Serphint needs access to your microphone to record audio with your hints"
      }
    },
    
    // other configs
  }