// src/App.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleBar from './components/TitleBar';

export default function App() {
  return (
    <View style={styles.container}>
        <TitleBar />
        <View style={styles.content}>
        {/* Your other components */}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100vh',  // Use viewport height
        backgroundColor: '#ddd',
        display: 'flex',
        flexDirection: 'column'
      },
  content: {
    flex: 1,
    padding: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});