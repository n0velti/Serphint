// webpack.config.js (alternative approach)
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add resolver aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native-vision-camera': path.resolve(__dirname, './src/mocks/vision-camera-mock.js')
  };
  
  // Add explicit rule to ignore the actual module
  config.module.rules.unshift({
    test: /node_modules\/react-native-vision-camera/,
    use: 'null-loader'
  });
  
  // Log the configuration for debugging
  console.log('Webpack resolve aliases:', config.resolve.alias);
  
  return config;
};