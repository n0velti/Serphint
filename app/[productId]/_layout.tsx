// ProductLayout.tsx
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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


      {/* <View style={styles.buyLayout}>
      <View style={styles.textLeft}>
           <Text style={styles.inStockText}>In Stock</Text>
           <View style={styles.priceRow}>
              <Text style={styles.dollarSign}>$</Text>
              <Text style={styles.dollarFigure}>134</Text>
              <Text style={styles.centFigure}>.99</Text>
              <Text style={styles.billingPeriod}> / month</Text>
            </View>
        </View>
        <View style={styles.textRight}>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.button, styles.addToCartButton]}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          style={[styles.button, styles.buyNowButton]}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
         
        </View>
      </View> */}

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
  buyLayout: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -400 }], // Half of the width for centering
    width: 800,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // for Android
  },
  textLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 6,
  },
  addToCartButton: {
    backgroundColor: '#333',
  },
  buyNowButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  inStockText: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
 
  },
  
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  
  dollarSign: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: 2,
    color: '#333',
    marginBottom: 2,
  },
  
  dollarFigure: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  
  centFigure: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 1,
    marginLeft: 1,
  },
  
  billingPeriod: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    marginBottom: 2,
  },
});