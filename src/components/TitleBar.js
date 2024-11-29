import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const TitleBar = () => {
 const closeWindow = () => window.electron.send('close-window');
 const minimizeWindow = () => window.electron.send('minimize-window');
 const maximizeWindow = () => window.electron.send('maximize-window');

 return (
   <View style={styles.titleBar}>
     <TouchableOpacity onPress={closeWindow} style={[styles.button, styles.closeButton]} />
     <TouchableOpacity onPress={minimizeWindow} style={[styles.button, styles.minimizeButton]} />
     <TouchableOpacity onPress={maximizeWindow} style={[styles.button, styles.maximizeButton]} />
   </View>
 );
};

const styles = StyleSheet.create({
 titleBar: {
   flexDirection: 'row',
   padding: 10,
   backgroundColor: '#333',
   WebkitAppRegion: 'drag' // Add this line
 },
 button: {
   width: 12,
   height: 12,
   borderRadius: 6,
   marginRight: 8,
   WebkitAppRegion: 'no-drag' // Make buttons clickable
 },
 closeButton: {
   backgroundColor: '#FF5F56'
 },
 minimizeButton: {
   backgroundColor: '#FFBD2E'
 },
 maximizeButton: {
   backgroundColor: '#27C93F'
 }
});

export default TitleBar;