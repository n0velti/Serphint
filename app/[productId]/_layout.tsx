// ProductLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import ProductPreview from '@/components/ui/web/Post/ProductPreview';

function ProductLayout(props) {
    const [currentPostTab, setCurrentPostTab] = React.useState('');
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}  initialParams={{ setCurrentPostTab }} // or use context

        />
      </Stack>

      {/* {currentPostTab !== 'index' && (
        <View style={styles.productPreview}>
          <ProductPreview />
        </View>
      )} */}
    </View>
  );
}

export default ProductLayout;

const styles = StyleSheet.create({
  productPreview: {
    height: '100%',
    paddingVertical: 20,
  },
});