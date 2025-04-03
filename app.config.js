export default {
    scheme: 'Serphint',
    web: {
      bundler: 'metro',
    },
    "android": {
      "package": "com.eanuichi.Serphint"
    },

    ios: {
      bundleIdentifier: 'com.eanuichi.Serphint',
      infoPlist: {
        NSCameraUsageDescription: "Serphint needs access to your camera to create visual hints",
        NSMicrophoneUsageDescription: "Serphint needs access to your microphone to record audio with your hints",
        NSLocationAlwaysAndWhenInUseUsageDescription: "Serphint needs access to your location to provide location-based hints",
        NSLocationWhenInUseUsageDescription: "Serphint needs access to your location to provide location-based hints",
        NSLocationAlwaysUsageDescription: "Serphint needs access to your location to provide location-based hints",

        },
        "icon": "./assets/serphint_icon_red.png",
    },

    
    // other configs
  }